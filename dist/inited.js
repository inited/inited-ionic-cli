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
    Inited.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var writeFile, actions, _i, actions_1, action, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        writeFile = util.promisify(fs.writeFile);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        actions = ["abuild", "adist", "aprepare", "apub", "arelease",
                            "ibuild", "idist", "iprepare", "ipub", "irelease",
                            "wbuild", "wdist", "wprepare", "wpub", "wrelease"];
                        _i = 0, actions_1 = actions;
                        _a.label = 2;
                    case 2:
                        if (!(_i < actions_1.length)) return [3 /*break*/, 5];
                        action = actions_1[_i];
                        return [4 /*yield*/, writeFile(action + ".sh", "inited " + action, { mode: 755 })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _a.sent();
                        console.log("Error while initializing: " + ex_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.abuild = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mvasync;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildFor("android")];
                    case 1:
                        _a.sent();
                        mvasync = util.promisify(mv);
                        return [4 /*yield*/, mvasync(process.cwd() + "/platforms/android/build/outputs/apk/android-debug.apk", process.cwd() + "/" + utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".apk")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.adist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.distFor("android")];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, utils_1.Utils.exec("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cert/my-release-key.keystore -storepass Heslo123 platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, utils_1.Utils.exec("rm -f " + utils_1.Utils.projectName + ".apk")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, utils_1.Utils.exec("$ANDROID_HOME/build-tools/22.0.1/zipalign -v 4 $APP " + utils_1.Utils.projectName + ".apk")];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        console.error("Error while running adist: " + ex_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.aprepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepareFor("android")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.apub = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".apk";
                        return [4 /*yield*/, this.pubFile(fileName, fileName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.arelease = function () {
        return __awaiter(this, void 0, void 0, function () {
            var source, destination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".apk";
                        destination = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + ".apk";
                        return [4 /*yield*/, this.pubFile(source, destination)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.ibuild = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildFor("ios")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.buildIOS(utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.idist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.Utils.exec("security unlock-keychain -p h login.keychain")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.distFor("ios")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.buildIOS(utils_1.Utils.projectName)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.iprepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepareFor("ios")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.ipub = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".ipa";
                        return [4 /*yield*/, this.pubFile(fileName, fileName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.irelease = function () {
        return __awaiter(this, void 0, void 0, function () {
            var source, destination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + "-" + utils_1.Utils.buildNumber + ".ipa";
                        destination = utils_1.Utils.projectName + "-" + utils_1.Utils.appVersion + ".ipa";
                        return [4 /*yield*/, this.pubFile(source, destination)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.setversion = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args[0]) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.Utils.setAppVersion(args[0])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.error("You have to provide version as next argument");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.wbuild = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildFor("windows")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.wdist = function () {
    };
    Inited.prototype.wprepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepareFor("windows")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.wrelease = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Inited.prototype.prepareFor = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.removePlatformsAndPlugins()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.installAndPrune()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, utils_1.Utils.exec("cordova platform add " + platform + " --nofetch")];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _a.sent();
                        this.logError("Error while running prepare for " + platform, ex_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.buildFor = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!utils_1.Utils.isIonicApp()) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.Utils.exec("ionic build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs")];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, utils_1.Utils.exec("cordova build " + platform + " --device")];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.logError("Error while running build for " + platform, ex_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
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
    Inited.prototype.distFor = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!utils_1.Utils.isIonicApp()) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.Utils.exec("ionic build " + platform + " --device --prod --aot --minifyjs --minifycss --optimizejs --release")];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, utils_1.Utils.exec("cordova build " + platform + " --device --release")];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.logError("Error while running dist for " + platform, ex_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
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
    Inited.prototype.installAndPrune = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
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
                        ex_6 = _a.sent();
                        console.log("Failed install and prune: " + ex_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Inited.prototype.removePlatformsAndPlugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_7, ex_8, unlink, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, rmfr("platforms")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        console.log("Failed to remove platforms directory: " + ex_7);
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, rmfr("plugins")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_8 = _a.sent();
                        console.log("Failed to remove plugins directory: " + ex_8);
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        unlink = util.promisify(fs.unlink);
                        return [4 /*yield*/, unlink("package-lock.json")];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        ex_9 = _a.sent();
                        console.log("Failed to remove package-lock.json file: " + ex_9);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Inited.platforms = ["android", "ios", "windows"];
    return Inited;
}());
exports.Inited = Inited;
