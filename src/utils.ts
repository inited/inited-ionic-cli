import cordovaCommon = require("cordova-common");
import process = require("process");
import path = require("path");

export class Utils {
    public static get projectName(): string {
        return this.packageJson.name;
    }

    public static get appVersion(): string {
        return process.env.npm_package_version;
    }

    public static get appName(): string {
        const appConfig = new cordovaCommon.ConfigParser("./config.xml");
        return appConfig.name();
    }

    private static get packageJson(): any {
        console.log(process.cwd());
        let pckg = require("./package.json");
        console.log(pckg);
        return pckg;
    }
}