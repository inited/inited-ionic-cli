#!/usr/bin/env node

"use strict";

if (process.argv.length > 2) {
    require("../dist/index").run();
} else {
    console.error("Tell me which actions you want to provide.");
}