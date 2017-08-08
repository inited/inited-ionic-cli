import { Inited } from "./inited";
import process = require("process");

export function run() {
    const arg: string = process.argv[2];
    if (!arg) {
        console.log("Don't know, what to do.");
    } else {
        let inited: Inited = new Inited();
        console.log(inited);
        if (inited[arg] != undefined) {
            inited[arg].call(inited);
        } else {
            console.log("Don't know, what to do.");
        }
    }
}