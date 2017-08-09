import fs = require("fs");
import util = require("util");
import child_process = require("child_process");
import { Utils } from "./utils";
import rmfr = require("rmfr");

export class Inited {

    private static platforms: Array<string> = ["android", "ios", "windows"];

    public async initialize(): Promise<any> {
        let writeFile = util.promisify(fs.writeFile);
        try {
            const actions: Array<string> = ["abuild", "adist", "aprepare", "apub", "arelease",
                                            "ibuild", "idist", "iprepare", "ipub", "irelease",
                                            "wbuild", "wdist", "wprepare", "wpub", "wrelease"];
            for(const action of actions) {
                await writeFile(action + ".sh", "npm run inited " + action, {mode: 755});
            }
        } catch (ex) {
            console.log("Error while initializing: " + ex);
        }

    }

    public async abuild() {
        await this.buildFor("android");
    }

    public async adist() {
        await this.distFor("android");
        try {
            await this.exec("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cert/my-release-key.keystore -storepass Heslo123 platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name");
            await this.exec("rm -f " + Utils.projectName + ".apk");
            await this.exec("$ANDROID_HOME/build-tools/22.0.1/zipalign -v 4 $APP " + Utils.projectName + ".apk")
        } catch (ex) {
            console.error("Error while running adist: " + ex);
        }
    }

    public async aprepare(): Promise<any> {
        await this.prepareFor("android");
    }

    public apub() {
        const fileName: string = Utils.projectName + "-" + Utils.appVersion + "-$BUILD_NUMBER.apk";
        this.pubFile(fileName, fileName);
    }

    public arelease() {
        const source: string = Utils.projectName + "-" + Utils.appVersion + "-$BUILD_NUMBER.apk";
        const destination: string = Utils.projectName + "-" + Utils.appVersion + ".apk";
        this.pubFile(source, destination);
    }

    public async ibuild() {
        await this.buildFor("ios");
        await this.buildIOS(Utils.projectName + "-" + Utils.appVersion + "-$BUILD_NUMBER");
    }

    public async idist() {
        this.exec("security unlock-keychain -p h login.keychain");
        await this.distFor("ios");
        await this.buildIOS(Utils.projectName)
    }

    public async iprepare() {
        await this.prepareFor("ios");
    }

    public ipub() {
        const fileName: string = Utils.projectName + "-" + Utils.appVersion + "-$BUILD_NUMBER.ipa";
        this.pubFile(fileName, fileName);
    }

    public irelease() {
        const source: string = Utils.projectName + "-" + Utils.appVersion + "-$BUILD_NUMBER.ipa";
        const destination: string = Utils.projectName + "-" + Utils.appVersion + ".ipa";
        this.pubFile(source, destination);
    }

    public async wbuild() {
        await this.buildFor("windows");
    }

    public wdist() {

    }

    public async wprepare(): Promise<any> {
        await this.prepareFor("windows");
    }

    public async wrelease() {

    }

    private async prepareFor(platform: string): Promise<any> {
        try {
            await this.installAndPrune();
            await this.removePlatformsAndPlugins();
            await this.exec("inited cordova platform add " + platform + " --nofetch");
        } catch (ex) {
            this.logError("Error while running prepare for " + platform, ex);
        }
    }

    private async buildFor(platform: string): Promise<any> {
        try {
            await this.exec("ionic cordova build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs");
        } catch (ex) {
            this.logError("Error while running build for " + platform, ex);
        }
    }

    private async buildIOS(file: string) {
        this.exec("/usr/bin/xcrun -v -v -sdk iphoneos PackageApplication \"$(pwd)/platforms/ios/build/device/$APPNAME.app\" -o \"$(pwd)/" + file + ".ipa\"")
    }

    private async distFor(platform: string): Promise<any> {
        try {
            await this.exec("ionic cordova build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --release");
        } catch (ex) {
            this.logError("Error while running dist for " + platform, ex);
        }
    }

    private async pubFile(src: string, dest: string) {
        this.exec(" scp " + src + " inited@ini.inited.cz:public_html/ios/" + dest)
    }

    private logError(message: string, error: any) {
        console.log(message);
        console.log(error);
    }

    private async installAndPrune(): Promise<any> {
        try {
            await this.exec("npm install");
            await this.exec("npm prune");
        } catch (ex) {
            console.log("Failed install and prune: " + ex);
        }
    }

    private async removePlatformsAndPlugins(): Promise<any> {
        try {
            await rmfr("platforms");
        } catch (ex) {
            console.log("Failed to remove platforms directory: " + ex);
        }
        try {
            await rmfr("plugins");
        } catch (ex) {
            console.log("Failed to remove plugins directory: " + ex);
        }
    }

    private async exec(command: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            console.log("Executing command: " + command);
            const commandArr: Array<string> = command.split(" ");
            console.log(commandArr);
            let spawn;
            if (commandArr.length > 1) {
                console.log("Creating spawn with more commands");
                try {
                    spawn = child_process.spawn(commandArr[0], commandArr.splice(1));
                } catch (ex) {
                    console.log("Error while creating spawn");
                    console.log(ex);
                }
            } else {
                spawn = child_process.spawn(command);
            }
            spawn.stdout.on('data', data => {
                console.log(data.toString());
            });
            spawn.stderr.on('data', data => {
                console.error(data.toString());
            });
            spawn.on('exit', code => {
                resolve();
            });
        });
    }
}