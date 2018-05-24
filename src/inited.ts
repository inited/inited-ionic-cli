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
                await writeFile(prefix + "prepare.sh", "#!/usr/bin/env bash\n\ninited prepare " + platform + " clean", {mode: "755"});
                await writeFile(prefix + "pub.sh", "#!/usr/bin/env bash\n\ninited pub " + platform, {mode: "755"});
                await writeFile(prefix + "release.sh", "#!/usr/bin/env bash\n\ninited release " + platform, {mode: "755"});
            }
        } catch (ex) {
            console.log("Error while initializing: " + ex);
        }

    }

    public async build(args: Array<string>) {
        if (args) {
            await this.preBuild(args[0]);
            await this.buildFor(args[0]);
            await this.postBuild(args[0]);
        } else {
            console.error("Tell me platform to build eg.\n" +
                "inited build android");
        }
    }

    public async debug(args: Array<any>) {
        if (args) {
            const live: boolean = args.indexOf("live") != -1;
            if (Utils.isIonicApp()) {
                await Utils.exec("ionic cordova run " + args[0] + " --debug --device --no-interactive" + live? " -l -c -s": "");
                return;
            }
            if (Utils.isAngularApp()) {
                await this.buildAngular(false);
            }
            if (live) {
                console.warn("Not ionic app, can't perform livereload.");
            }
            await Utils.exec("cordova run " + args[0] + " --debug --device")
        } else {
            console.error("Tell me platform to debug eg.\n" +
                "inited debug android\n" +
                "If you are debugging ionic application you can also debug app with livereload eg.\n" +
                "inited debug android live");
        }
    }

    public async dist(args: Array<string>) {
        if (args) {
            await this.preDist(args[0]);
            await this.distFor(args[0]);
            await this.postDist(args[0]);
        } else {
            console.error("Tell me platform to dist eg.\n" +
                "inited dist android");
        }
    }

    public help() {
        console.log("Inited cli is cli for running ionic, cordova commands also with angular 2 and helps to init projects.\n" +
            "Commands for use:\n" +
            "- init - Initializes projects, creates *prepare, *pub etc. files.\n" +
            "   - Defaults platforms are android and ios, you can also specify platforms to add eg. android, ios, windows...\n" +
            "   - You can also specify other parameters as version, appName, projectName or id\n" +
            "   - Example:\n" +
            "       - inited init android ios windows id=cz.inited.app appName=app\n" +
            "- prepare - Prepares project for specified platform\n" +
            "   - Removes platforms and plugins folder and package-lock.json file\n" +
            "   - Runs npm install and npm prune\n" +
            "   - Adds selected platform\n" +
            "   - Example:\n" +
            "       - inited prepare android\n" +
            "- build - Builds selected platform and copies package to the project folder\n" +
            "   - Example:\n" +
            "       - inited build android\n" +
            "- debug - Starts app on device in debug mode\n" +
            "   - If \"live\" parameter is presents, starts live reload with console logs\n" +
            "   - Example:\n" +
            "       - inited debug android live\n" +
            "- dist - Builds and signs app for specified platform\n" +
            "   - Example:\n" +
            "       - inited dist android\n" +
            "- help - Shows this\n" +
            "   - Example:\n" +
            "       - inited help\n" +
            "- pub - Publishes app package to the web - developer package\n" +
            "   - Package has to be created before by build\n" +
            "   - Example:\n" +
            "       - inited pub android\n" +
            "- release - Publishes released package to the web - package to test for clients\n" +
            "   - Package has to be created before by build\n" +
            "   - Example:\n" +
            "       - inited release android\n" +
            "- run - Runs app on device as release build with production optimized - as created by build\n" +
            "   - Example:\n" +
            "       - inited run android\n" +
            "- set - Sets info in the app eg.\n" +
            "   - version - sets app version in config.xml, package.json and in html in tag ending with id=\"app-version\">\n" +
            "   - appName - sets app name in config.xml\n" +
            "   - projectName - sets project name in package.json and if package.json and config.xml names are same, sets it also in config.xml\n" +
            "   - id - sets id of the app in config.xml\n" +
            "   - Example:\n" +
            "       - inited set id cz.inited.app")
    }

    public async prepare(args: Array<string>) {
        if (args) {
            if (args.indexOf("clean") != -1) {
                await this.prepareFor(args[0], true);
            } else {
                await this.prepareFor(args[0])
            }
        } else {
            console.error("Tell me platform to prepare eg.\n" +
                "inited prepare android");
        }
    }

    public async pub(args: Array<string>) {
        if (args) {
            let fileName: string = "";
            switch (args[0]) {
                case "android":
                    fileName = Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + ".apk";
                    break;
                case "ios":
                    fileName = Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + ".ipa";
                    break;
            }
            if (fileName.trim() != "") {
                await this.pubFile(fileName, fileName);
            } else {
                console.error("Sorry, don´t know what to upload\n" +
                    "Found no file to publish. Looking for:\n" +
                    Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + "(.apk|.ipa)");
            }
        } else {
            console.error("Tell me platform to publish eg.\n" +
                "inited pub android");
        }
    }

    public async release(args: Array<string>) {
        if (args) {
            let source: string = "";
            let destination: string = "";
            switch (args[0]) {
                case "android":
                    source = Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + ".apk";
                    destination = Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + ".apk";
                    break;
                case "ios":
                    source = Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + ".ipa";
                    destination = Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + ".ipa";
                    break;
            }

            if (source.trim() != "" && destination.trim() != "") {
                await this.pubFile(source, destination);
            } else {
                console.error("Sorry, don´t know what to upload\n" +
                    "Found no file to release. Looking for:\n" +
                    Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + "(.apk|.ipa)");
            }
        } else {
            console.error("Tell me platform to release eg.\n" +
                "inited release android");
        }
    }

    public async run(args: Array<string>) {
        if (args) {
            console.log("Running production version, for development version run: inited run " + args[0]);
            if (args.indexOf("live") != -1) {
                console.warn("Running productions version, if you want to use live reload use: \n" +
                    "inited debug " + args[0] + " live");
            }
            if (Utils.isIonicApp()) {
                await Utils.exec("ionic cordova run " + args[0] + " --device --prod --aot --minifyjs --minifycss --optimizejs --no-interactive");
                return;
            } else if (Utils.isAngularApp()) {
                await this.buildAngular();
            }
            await Utils.exec("cordova run " + args[0] + " --device");
        } else {
            console.error("Tell me platform to run eg.\n" +
                "inited run android")
        }
    }

    public async set(args) {
        if (!args || args.length < 2) {
            console.error("You have to provide key and value to change, you can provide this keys:\n" +
                "- version\n- appName\n- projectName\n- id\n" +
                "Example:\n" +
                "inited set id cz.inited.app");
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

    private async prepareFor(platform: string, clean: boolean = false): Promise<any> {
        try {
            if (clean) {
                await rmfr("node_modules");
            }
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
                await Utils.exec("ionic cordova build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --no-interactive");
            } else if (Utils.isAngularApp()) {
                await this.buildAngular();
                await Utils.exec("cordova build " + platform + " --device");
            }
        } catch (ex) {
            this.logError("Error while running build for " + platform, ex);
        }
    }

    private async buildAngular(prod: boolean = true) {
        await Utils.exec("ng build" + (prod? " --prod": ""));
    }

    private async preBuild(platform: string) {
        switch (platform) {
            case "ios":
                await this.unlockKeychain();
                break;
        }
    }

    private async postBuild(platform: string) {
        switch (platform) {
            case "android":
                const destination: string = process.cwd() + "/" + Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + ".apk";
                if (fs.existsSync(process.cwd() + "/platforms/android/build/outputs/apk/android-debug.apk")) {
                    await this.move(process.cwd() + "/platforms/android/build/outputs/apk/android-debug.apk", destination);
                } else if (fs.existsSync(process.cwd() + "/platforms/android/build/outputs/apk/debug/android-debug.apk")) {
                    await this.move(process.cwd() + "/platforms/android/build/outputs/apk/debug/android-debug.apk", destination);
                } else {
                    await this.move(process.cwd() + "/platforms/android/app/build/outputs/apk/debug/app-debug.apk", destination)
                }
                break;
            case "ios":
                if (fs.existsSync(process.cwd() + "/platforms/ios/build/device/" + Utils.appName + ".ipa")) {
                    await this.move(process.cwd() + "/platforms/ios/build/device/" + Utils.appName + ".ipa", process.cwd() + "/" + Utils.projectName + "-" + Utils.appVersion.replace(/\./g, "_") + "-" + Utils.buildNumber + ".ipa");
                } else {
                    await Utils.exec("/usr/bin/xcrun -v -v -sdk iphoneos PackageApplication \"" + process.cwd() + "/platforms/ios/build/device/" + Utils.appName + ".app\" -o \"" + process.cwd() + "/" + Utils.projectName + "-" + Utils.appVersion + "-" + Utils.buildNumber + ".ipa\"")
                }
                break;
        }
    }

    private async preDist(platform: string): Promise<any> {
        switch (platform) {
            case "ios":
                await this.unlockKeychain();
                break;
            case "android":
                break;
        }
    }

    private async distFor(platform: string): Promise<any> {
        try {
            if (Utils.isIonicApp()) {
                await Utils.exec("ionic cordova build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --release --no-interactive");
            } else if (Utils.isAngularApp()) {
                await this.buildAngular();
                await Utils.exec("cordova build " + platform + " --device --release");
            }
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
                await this.move(process.cwd() + "/platforms/ios/build/device/" + Utils.appName + ".ipa", process.cwd() + "/" + Utils.projectName + "_" + ".ipa");
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

    private async move(source, destination) {
        const mvasync = util.promisify(mv);
        console.log("Moving " + source + " to " + destination);
        await mvasync(source, destination);
    }

    private async unlockKeychain(): Promise<any> {
        await Utils.exec("security unlock-keychain -p h login.keychain");
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