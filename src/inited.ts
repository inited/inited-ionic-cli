import fs = require("fs");
import util = require("util");
import child_process = require("child_process");
import { Utils } from "./utils";
import rmfr = require("rmfr");
import mv = require("mv");

export class Inited {

    public async init(args: Array<any>): Promise<any> {
        try {
            let platforms: Array<string> = ["android", "ios"];
            let argPlatforms: Array<string> = [];
            if (args) {
                for(const arg of args) {
                    const keyValue = arg.split("=");
                    if (keyValue.length == 2) {
                        await this.set(keyValue);
                    } else if (keyValue.length == 1) {
                        argPlatforms.push(arg);
                    }
                }

                if (argPlatforms.length > 0) {
                    platforms = argPlatforms;
                }
            }
            const writeFile = util.promisify(fs.writeFile);
            for(const platform of platforms) {
                const prefix: string = process.cwd() + "/" + platform.charAt(0);
                await writeFile(prefix + "build.sh", "#!/usr/bin/env bash\n\ninited build " + platform, {mode: "755"});
                await writeFile(prefix + "dist.sh", "#!/usr/bin/env bash\n\ninited dist " + platform, {mode: "755"});
                await writeFile(prefix + "prepare.sh", "#!/usr/bin/env bash\n\ninited prepare " + platform, {mode: "755"});
                await writeFile(prefix + "pub.sh", "#!/usr/bin/env bash\n\ninited pub " + platform, {mode: "755"});
                await writeFile(prefix + "release.sh", "#!/usr/bin/env bash\n\ninited release " + platform, {mode: "755"});
            }
        } catch (ex) {
            console.log("Error while initializing: " + ex);
        }

    }

    public async build(args: Array<string>) {
        if (args) {
            await this.buildFor(args[0]);
            switch (args[0]) {
                case "android":
                    await this.androidMove();
                    break;
                case "ios":
                    await this.buildIOS(Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber);
                    break;
            }
        } else {
            console.error("Tell me platform to build");
        }
    }

    public async dist(args: Array<string>) {
        if (args) {
            await this.preDist(args[0]);
            await this.distFor(args[0]);
            await this.postDist(args[0]);
        } else {
            console.error("Tell me platform to dist");
        }
    }

    public async prepare(args: Array<string>) {
        if (args) {
            await this.prepareFor(args[0]);
        } else {
            console.error("Tell me platform to prepare");
        }
    }

    public async pub(args: Array<string>) {
        if (args) {
            let fileName: string = "";
            switch (args[0]) {
                case "android":
                    fileName = Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + ".apk";
                    break;
                case "ios":
                    fileName = Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + ".ipa";
                    break;
            }
            if (fileName.trim() != "") {
                await this.pubFile(fileName, fileName);
            } else {
                console.error("Sorry, don´t know what to upload");
            }
        } else {
            console.error("Tell me platform to publish");
        }
    }

    public async release(args: Array<string>) {
        if (args) {
            let source: string = "";
            let destination: string = "";
            switch (args[0]) {
                case "android":
                    source = Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + ".apk";
                    destination = Utils.projectName + "-" + Utils.appVersion + ".apk";
                    break;
                case "ios":
                    source = Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + ".ipa";
                    destination = Utils.projectName + "-" + Utils.appVersion + ".ipa";
                    break;
            }

            if (source.trim() != "" && destination.trim() != "") {
                await this.pubFile(source, destination);
            } else {
                console.error("Sorry, don´t know what to upload");
            }
        } else {
            console.error("Tell me platform to release");
        }
    }

    public async set(args) {
        if (!args || args.length < 2) {
            console.error("You have to provide key and value to change");
        } else {
            switch (args[0]) {
                case "version":
                    await Utils.setAppVersion(args[1]);
                    break;
                case "appName":
                    Utils.setAppName(args[1]);
                    break;
                case "projectName":
                    await Utils.setProjectName(args[1]);
                    break;
                case "id":
                    Utils.setId(args[1]);
                    break;
            }
        }
    }

    private async prepareFor(platform: string): Promise<any> {
        try {
            await this.removePlatformsAndPlugins();
            await this.installAndPrune();
            if (Utils.isAngularApp()) {
                await this.buildAngular();
            }
            await Utils.exec("cordova platform add " + platform + " --nofetch");
        } catch (ex) {
            this.logError("Error while running prepare for " + platform, ex);
        }
    }

    private async buildFor(platform: string): Promise<any> {
        try {
            if (Utils.isIonicApp()) {
                await Utils.exec("ionic build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --no-interactive --confirm");
            } else if (Utils.isAngularApp()) {
                await this.buildAngular();
            }
            await Utils.exec("cordova build " + platform + " --device");
        } catch (ex) {
            this.logError("Error while running build for " + platform, ex);
        }
    }

    private async buildIOS(file: string) {
        await Utils.exec("/usr/bin/xcrun -v -v -sdk iphoneos PackageApplication \"$(pwd)/platforms/ios/build/device/$APPNAME.app\" -o \"$(pwd)/" + file + ".ipa\"")
    }

    private async buildAngular() {
        await Utils.exec("ng build --prod");
    }

    private async preDist(platform: string): Promise<any> {
        switch (platform) {
            case "ios":
                await Utils.exec("security unlock-keychain -p h login.keychain");
                break;
            case "android":
                break;
        }
    }

    private async distFor(platform: string): Promise<any> {
        try {
            if (Utils.isIonicApp()) {
                await Utils.exec("ionic build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --release --no-interactive --confirm");
            } else if (Utils.isAngularApp()) {
                await this.buildAngular();
            }
            await Utils.exec("cordova build " + platform + " --device --release");
        } catch (ex) {
            this.logError("Error while running dist for " + platform, ex);
        }
    }

    private async postDist(platform: string): Promise<any> {
        switch (platform) {
            case "android":
                await Utils.exec("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cert/my-release-key.keystore -storepass Heslo123 platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name");
                await Utils.exec("rm -f " + Utils.projectName + ".apk");
                await Utils.exec("$ANDROID_HOME/build-tools/22.0.1/zipalign -v 4 $APP " + Utils.projectName + ".apk");
                break;
            case "ios":
                await this.buildIOS(Utils.projectName);
                break;
        }
    }

    private async pubFile(src: string, dest: string) {
        await Utils.exec("scp " + src + " inited@ini.inited.cz:public_html/ios/" + dest)
    }

    private logError(message: string, error: any) {
        console.log(message);
        console.log(error);
    }

    private async androidMove() {
        const mvasync = util.promisify(mv);
        await mvasync(process.cwd() + "/platforms/android/build/outputs/apk/android-debug.apk", process.cwd() + "/" + Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + ".apk");
    }

    private async installAndPrune(): Promise<any> {
        try {
            await Utils.exec("npm install");
            await Utils.exec("npm prune");
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
        try {
            const unlink: any = util.promisify(fs.unlink);
            await unlink("package-lock.json");
        } catch (ex) {
            console.log("Failed to remove package-lock.json file: " + ex);
        }
    }
}