import cordovaCommon = require("cordova-common");

export class Utils {
    public static get projectName(): string {
        return process.env.npm_package_name;
    }

    public static get appVersion(): string {
        return process.env.npm_package_version;
    }

    public static get appName(): string {
        const appConfig = new cordovaCommon.ConfigParser("./config.xml");
        return appConfig.name();
    }
}