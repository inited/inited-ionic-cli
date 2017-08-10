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
var fs = require("fs");
var util = require("util");
var utils_1 = require("./utils");
var rmfr = require("rmfr");
var mv = require("mv");
var Inited = (function () {
    function Inited() {
    }
    Inited.prototype.init = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var platforms, argPlatforms, _i, args_1, arg, keyValue, writeFile, _a, platforms_1, platform, prefix, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 15, , 16]);
                        platforms = ["android", "ios"];
                        argPlatforms = [];
                        if (!args) return [3 /*break*/, 6];
                        _i = 0, args_1 = args;
                        _b.label = 1;
                    case 1:
                        if (!(_i < args_1.length)) return [3 /*break*/, 5];
                        arg = args_1[_i];
                        keyValue = arg.split("=");
                        if (!(keyValue.length == 2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.set(keyValue)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (keyValue.length == 1) {
                            argPlatforms.push(arg);
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (argPlatforms.length > 0) {
                            platforms = argPlatforms;
                        }
                        _b.label = 6;
                    case 6:
                        writeFile = util.promisify(fs.writeFile);
                        _a = 0, platforms_1 = platforms;
                        _b.label = 7;
                    case 7:
                        if (!(_a < platforms_1.length)) return [3 /*break*/, 14];
                        platform = platforms_1[_a];
                        prefix = process.cwd() + "/" + platform.charAt(0);
                        return [4 /*yield*/, writeFile(prefix + "build.sh", "#!/usr/bin/env bash\n\ninited build " + platform, { mode: "755" })];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, writeFile(prefix + "dist.sh", "#!/usr/bin/env bash\n\ninited dist " + platform, { mode: "755" })];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, writeFile(prefix + "prepare.sh", "#!/usr/bin/env bash\n\ninited prepare " + platform, { mode: "755" })];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, writeFile(prefix + "pub.sh", "#!/usr/bin/env bash\n\ninited pub " + platform, { mode: "755" })];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, writeFile(prefix + "release.sh", "#!/usr/bin/env bash\n\ninited release " + platform, { mode: "755" })];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13:
                        _a++;
                        return [3 /*break*/, 7];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        ex_1 = _b.sent();
                        console.log("Error while initializing: " + ex_1);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.build = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!args) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.buildFor(args[0])];
                    case 1:
                        _b.sent();
                        _a = args[0];
                        switch (_a) {
                            case "android": return [3 /*break*/, 2];
                            case "ios": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.androidMove()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.buildIOS(utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion.replace(/\./g, "_") + "-" + utils_1.Utils.buildNumber)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.error("Tell me platform to build");
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.dist = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.preDist(args[0])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.distFor(args[0])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.postDist(args[0])];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.error("Tell me platform to dist");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.prepare = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prepareFor(args[0])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.error("Tell me platform to prepare");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.pub = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args) return [3 /*break*/, 4];
                        fileName = "";
                        switch (args[0]) {
                            case "android":
                                fileName = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion.replace(/\./g, "_") + "-" + utils_1.Utils.buildNumber + ".apk";
                                break;
                            case "ios":
                                fileName = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion.replace(/\./g, "_") + "-" + utils_1.Utils.buildNumber + ".ipa";
                                break;
                        }
                        if (!(fileName.trim() != "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pubFile(fileName, fileName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.error("Sorry, don´t know what to upload");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        console.error("Tell me platform to publish");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.release = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var source, destination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args) return [3 /*break*/, 4];
                        source = "";
                        destination = "";
                        switch (args[0]) {
                            case "android":
                                source = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".apk";
                                destination = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + ".apk";
                                break;
                            case "ios":
                                source = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".ipa";
                                destination = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + ".ipa";
                                break;
                        }
                        if (!(source.trim() != "" && destination.trim() != "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pubFile(source, destination)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.error("Sorry, don´t know what to upload");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        console.error("Tell me platform to release");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.set = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!args || args.length < 2)) return [3 /*break*/, 1];
                        console.error("You have to provide key and value to change");
                        return [3 /*break*/, 8];
                    case 1:
                        _a = args[0];
                        switch (_a) {
                            case "version": return [3 /*break*/, 2];
                            case "appName": return [3 /*break*/, 4];
                            case "projectName": return [3 /*break*/, 5];
                            case "id": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 2: return [4 /*yield*/, utils_1.Utils.setAppVersion(args[1])];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        utils_1.Utils.setAppName(args[1]);
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, utils_1.Utils.setProjectName(args[1])];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        utils_1.Utils.setId(args[1]);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.prepareFor = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.removePlatformsAndPlugins()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.installAndPrune()];
                    case 2:
                        _a.sent();
                        if (!utils_1.Utils.isAngularApp()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.buildAngular()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, utils_1.Utils.exec("cordova platform add " + platform + " --nofetch")];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        this.logError("Error while running prepare for " + platform, ex_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.buildFor = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!utils_1.Utils.isIonicApp()) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.Utils.exec("ionic build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --no-interactive --confirm")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!utils_1.Utils.isAngularApp()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.buildAngular()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, utils_1.Utils.exec("cordova build " + platform + " --device")];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        this.logError("Error while running build for " + platform, ex_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.buildIOS = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.Utils.exec("/usr/bin/xcrun -v -v -sdk iphoneos PackageApplication \"$(pwd)/platforms/ios/build/device/$APPNAME.app\" -o \"$(pwd)/" + file + ".ipa\"")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.buildAngular = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.Utils.exec("ng build --prod")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.preDist = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = platform;
                        switch (_a) {
                            case "ios": return [3 /*break*/, 1];
                            case "android": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, utils_1.Utils.exec("security unlock-keychain -p h login.keychain")];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3: return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.distFor = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!utils_1.Utils.isIonicApp()) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.Utils.exec("ionic build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --release --no-interactive --confirm")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!utils_1.Utils.isAngularApp()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.buildAngular()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, utils_1.Utils.exec("cordova build " + platform + " --device --release")];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_4 = _a.sent();
                        this.logError("Error while running dist for " + platform, ex_4);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.postDist = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = platform;
                        switch (_a) {
                            case "android": return [3 /*break*/, 1];
                            case "ios": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, utils_1.Utils.exec("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cert/my-release-key.keystore -storepass Heslo123 platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, utils_1.Utils.exec("rm -f " + utils_1.Utils.projectName + ".apk")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, utils_1.Utils.exec("$ANDROID_HOME/build-tools/22.0.1/zipalign -v 4 $APP " + utils_1.Utils.projectName + ".apk")];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.buildIOS(utils_1.Utils.projectName)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.pubFile = function (src, dest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.Utils.exec("scp " + src + " inited@ini.inited.cz:public_html/ios/" + dest)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.logError = function (message, error) {
        console.log(message);
        console.log(error);
    };
    Inited.prototype.androidMove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mvasync;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mvasync = util.promisify(mv);
                        return [4 /*yield*/, mvasync(process.cwd() + "/platforms/android/build/outputs/apk/android-debug.apk", process.cwd() + "/" + utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion.replace(/\./g, "_") + "-" + utils_1.Utils.buildNumber + ".apk")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.installAndPrune = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, utils_1.Utils.exec("npm install")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, utils_1.Utils.exec("npm prune")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        console.log("Failed install and prune: " + ex_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.removePlatformsAndPlugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6, ex_7, unlink, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, rmfr("platforms")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        console.log("Failed to remove platforms directory: " + ex_6);
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, rmfr("plugins")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_7 = _a.sent();
                        console.log("Failed to remove plugins directory: " + ex_7);
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        unlink = util.promisify(fs.unlink);
                        return [4 /*yield*/, unlink("package-lock.json")];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        ex_8 = _a.sent();
                        console.log("Failed to remove package-lock.json file: " + ex_8);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return Inited;
}());
exports.Inited = Inited;
