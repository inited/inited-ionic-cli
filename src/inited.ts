import fs = require("fs");
import util = require("util");
import child_process = require("child_process");
import { Utils } from "./utils";

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
            const {jsstdout, jsstderr} = await this.exec("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cert/my-release-key.keystore -storepass Heslo123 platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name");
            this.logOutErr(jsstdout, jsstderr);
            const {rstdout, rstderr} = await this.exec("rm -f " + Utils.projectName + ".apk");
            this.logOutErr(rstdout, rstderr);
            const {zstdout, zstderr} = await this.exec("$ANDROID_HOME/build-tools/22.0.1/zipalign -v 4 $APP " + Utils.projectName + ".apk")
            this.logOutErr(zstdout, zstderr);
        } catch (ex) {
            this.logOutErr("Error while running adist.", ex);
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
            this.removePlatformsAndPlugins();
            const {stdout, stderr} = await this.exec("ionic cordova platform add " + platform);
            this.logOutErr(stdout, stderr);
        } catch (ex) {
            this.logError("Error while running prepare for " + platform, ex);
        }
    }

    private async buildFor(platform: string): Promise<any> {
        try {
            const {stdout, stderr} = await this.exec("ionic cordova build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs");
            this.logOutErr(stdout, stderr);
        } catch (ex) {
            this.logError("Error while running build for " + platform, ex);
        }
    }

    private async buildIOS(file: string) {
        this.exec("/usr/bin/xcrun -v -v -sdk iphoneos PackageApplication \"$(pwd)/platforms/ios/build/device/$APPNAME.app\" -o \"$(pwd)/" + file + ".ipa\"")
    }

    private async distFor(platform: string): Promise<any> {
        try {
            const {stdout, stderr} = await this.exec("ionic cordova build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --release");
            this.logOutErr(stdout, stderr);
        } catch (ex) {
            this.logError("Error while running dist for " + platform, ex);
        }
    }

    private async pubFile(src: string, dest: string) {
        this.exec(" scp " + src + " inited@ini.inited.cz:public_html/ios/" + dest)
    }

    private logError(message: string, error: any) {
        console.log(message);
        console.log(error.Error);
        console.log(error.stdout);
        console.log(error.stderr);
    }

    private logOutErr(stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    }

    private async removePlatformsAndPlugins(): Promise<any> {
        let rmdir = util.promisify(fs.rmdir);
        try {
            await rmdir("platforms");
        } catch (ex) {
            console.log("Failed to remove platforms directory: " + ex);
        }
        try {
            await rmdir("plugins");
        } catch (ex) {
            console.log("Failed to remove plugins directory: " + ex);
        }
    }

    private async exec(command): Promise<any> {
        const exec = util.promisify(child_process.exec);
        return exec(command);
    }
}