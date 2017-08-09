import cordovaCommon = require("cordova-common");
import process = require("process");
import replace = require("replace-in-file");
import child_process = require("child_process");
import fs = require("fs");
import util = require("util");
import { ChildProcess } from "child_process";

export class Utils {
    public static get projectName(): string {
        return this.packageJson.name;
    }

    public static async setProjectName(value: string): Promise<any> {
        const config = this.config;
        const pckg = this.packageJson;
        if (config.name() == pckg.name) {
            Utils.setAppName(value);
        }
        await replace({
            files: process.cwd() + "/package.json",
            from: /"name": ".*"/,
            to: "\"name\": " + value + "\""
        });
    }

    public static get appVersion(): string {
        return this.config.version();
    }

    public static async setAppVersion(value: string): Promise<any> {
        const config = this.config;
        config.setVersion(value);
        config.write();
        await this.exec("npm --no-git-tag-version --allow-same-version version " + value);
        await replace({
            files: process.cwd() + "/**/*.html",
            from: /id="app-version">.*</,
            to: "id=\"app-version\">" + value + "<"
        });
    }

    public static get appName(): string {
        return this.config.name();
    }

    public static setAppName(value: string): void {
        const config = this.config;
        config.setName(value);
        config.write();
    }

    public static get buildNumber(): string {
        return process.env.BUILD_NUMBER? process.env.BUILD_NUMBER: "";
    }

    public static setId(value: string): void {
        const config = this.config;
        config.setPackageName(value);
        config.write();
    }

    public static async exec(command: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            console.log("Executing command: " + command);
            const commandArr: Array<string> = command.split(" ");
            let spawn;
            if (commandArr.length > 1) {
                try {
                    const commandParams = commandArr.splice(1);
                    spawn = child_process.spawn(/^win/.test(process.platform)? commandArr[0] + ".cmd": commandArr[0], commandParams);
                } catch (ex) {
                    console.log("Error while creating spawn");
                    console.log(ex);
                }
            } else {
                spawn = child_process.spawn(command);
            }
            spawn.stdout.on('data', (data: string) => {
                console.log(data.toString());
                if (data.includes("Install now?")) {
                    spawn.stdin.write("y");
                }
            });
            spawn.stderr.on('data', data => {
                console.error(data.toString());
            });
            spawn.on('exit', code => {
                resolve();
            });
        });
    }

    public static isIonicApp(): boolean {
        return fs.existsSync(process.cwd() + "/ionic.config.json");
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