"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cordovaCommon = require("cordova-common");
var process = require("process");
var Utils = (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "projectName", {
        get: function () {
            return this.packageJson.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "appVersion", {
        get: function () {
            return process.env.npm_package_version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "appName", {
        get: function () {
            var appConfig = new cordovaCommon.ConfigParser("./config.xml");
            return appConfig.name();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "packageJson", {
        get: function () {
            var pckg = require(process.cwd() + "/package.json");
            console.log(pckg);
            return pckg;
        },
        enumerable: true,
        configurable: true
    });
    return Utils;
}());
exports.Utils = Utils;
