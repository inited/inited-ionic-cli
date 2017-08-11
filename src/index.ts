import { Inited } from "./inited";
import process = require("process");

export function run() {
    const arg: string = process.argv[2];
    if (!arg) {
        console.log("Don't know, what to do. Here are some suggestions:");
        console.log();
        (new Inited()).help();
    } else {
        let inited: Inited = new Inited();
        console.log(inited);
        if (inited[arg] != undefined) {
            if (process.argv.length > 3) {
                const args = process.argv.splice(3);
                inited[arg].call(inited, args);
            } else {
                inited[arg].call(inited);
            }
        } else {
            console.log("Don't know, what to do. Here are some suggestions:");
            console.log();
            inited.help();
        }
    }
}