import cordovaCommon = require("cordova-common");
import process = require("process");
import path = require("path");

export class Utils {
    public static get projectName(): string {
        return this.packageJson.name;
    }

    public static get appVersion(): string {
        return this.config.version();
    }

    public static get appName(): string {
        return this.config.name();
    }

    public static get buildNumber(): string {
        return process.env.BUILD_NUMBER? process.env.BUILD_NUMBER: "";
    }

    private static get packageJson(): any {
        let pckg = require(process.cwd() + "/package.json");
        return pckg;
    }

    private static get config(): any {
        const appConfig = new cordovaCommon.ConfigParser(process.cwd() + "/config.xml");
        return appConfig;
    }
}