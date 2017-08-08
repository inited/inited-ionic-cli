"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inited_1 = require("./inited");
var process = require("process");
function run() {
    var arg = process.argv[2];
    if (!arg) {
        console.log("Don't know, what to do.");
    }
    else {
        var inited = new inited_1.Inited();
        if (inited[arg] != undefined) {
            inited[arg].call();
        }
        else {
            console.log("Don't know, what to do.");
        }
    }
}
exports.run = run;
