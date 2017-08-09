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
        console.log(inited);
        if (inited[arg] != undefined) {
            if (process.argv.length > 3) {
                var args = process.argv.splice(3);
                inited[arg].call(inited, args);
            }
            else {
                inited[arg].call(inited);
            }
        }
        else {
            console.log("Don't know, what to do.");
        }
    }
}
exports.run = run;
