import { Inited } from "./inited";
import process = require("process");

const arg: string = process.argv[2];
if (!arg) {
    console.log("Don't know, what to do.");
} else {
    let inited: Inited = new Inited();
    if (inited[arg] != undefined) {
        inited[arg].call();
    } else {
        console.log("Don't know, what to do.");
    }
}