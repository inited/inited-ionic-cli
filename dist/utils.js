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
            return this.config.version();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "appName", {
        get: function () {
            return this.config.name();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "buildNumber", {
        get: function () {
            return process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "packageJson", {
        get: function () {
            var pckg = require(process.cwd() + "/package.json");
            return pckg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "config", {
        get: function () {
            var appConfig = new cordovaCommon.ConfigParser(process.cwd() + "/config.xml");
            return appConfig;
        },
        enumerable: true,
        configurable: true
    });
    return Utils;
}());
exports.Utils = Utils;
