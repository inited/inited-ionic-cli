"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cordovaCommon = require("cordova-common");
var process = require("process");
var replace = require("replace-in-file");
var child_process = require("child_process");
var fs = require("fs");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "projectName", {
        get: function () {
            return this.packageJson.name;
        },
        enumerable: true,
        configurable: true
    });
    Utils.setProjectName = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var config, pckg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.config;
                        pckg = this.packageJson;
                        if (config.name() == pckg.name) {
                            Utils.setAppName(value);
                        }
                        return [4 /*yield*/, replace({
                                files: process.cwd() + "/package.json",
                                from: /"name": ".*"/,
                                to: "\"name\": \"" + value + "\""
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Utils, "appVersion", {
        get: function () {
            return this.config.version();
        },
        enumerable: true,
        configurable: true
    });
    Utils.setAppVersion = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.config;
                        config.setVersion(value);
                        config.write();
                        return [4 /*yield*/, this.exec("npm --no-git-tag-version --allow-same-version version " + value)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, replace({
                                files: process.cwd() + "/**/*.html",
                                from: /id="app-version">.*?</,
                                to: "id=\"app-version\">" + value + "<"
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Utils, "appName", {
        get: function () {
            return this.config.name();
        },
        enumerable: true,
        configurable: true
    });
    Utils.setAppName = function (value) {
        var config = this.config;
        config.setName(value);
        config.write();
    };
    Object.defineProperty(Utils, "buildNumber", {
        get: function () {
            return process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : "";
        },
        enumerable: true,
        configurable: true
    });
    Utils.setId = function (value) {
        var config = this.config;
        config.setPackageName(value);
        config.write();
    };
    Utils.exec = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        console.log("Executing command: " + command);
                        var commandArr = command.split(" ");
                        var spawn;
                        if (commandArr.length > 1) {
                            try {
                                var commandParams = commandArr.splice(1);
                                spawn = child_process.spawn(/^win/.test(process.platform) ? commandArr[0] + ".cmd" : commandArr[0], commandParams);
                            }
                            catch (ex) {
                                console.log("Error while creating spawn");
                                console.log(ex);
                            }
                        }
                        else {
                            spawn = child_process.spawn(command);
                        }
                        spawn.stdout.on('data', function (data) {
                            console.log(data.toString());
                            if (data.includes(" (Y/n)")) {
                                spawn.stdin.write("Y\n");
                            }
                        });
                        spawn.stderr.on('data', function (data) {
                            console.error(data.toString());
                        });
                        spawn.on('exit', function (code) {
                            resolve();
                        });
                    })];
            });
        });
    };
    Utils.isIonicApp = function () {
        return fs.existsSync(process.cwd() + "/ionic.config.json");
    };
    Utils.isAngularApp = function () {
        return fs.existsSync(process.cwd() + "/.angular-cli.json");
    };
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
