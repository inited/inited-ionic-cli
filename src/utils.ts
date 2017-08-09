import cordovaCommon = require("cordova-common");
import process = require("process");
import fs = require("fs");

export class Utils {
    public static get projectName(): string {
        console.log(process);
        console.log(process.env);
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