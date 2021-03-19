"use strict";
exports.__esModule = true;
exports.printCliArguments = exports.options = void 0;
var types_1 = require("./types");
var ramda_1 = require("ramda");
var yargs_1 = require("yargs");
var chalk_1 = require("chalk");
var table_1 = require("./table");
exports.options = yargs_1.option("input", {
    alias: "i",
    type: "string",
    description: "contracts dir",
    "default": types_1.cliArgumentsDefault.input
})
    .option("output", {
    alias: "o",
    type: "string",
    description: "docs output dir",
    "default": types_1.cliArgumentsDefault.output
})
    .option("compiler", {
    alias: "c",
    type: "string",
    description: "Vyper compiler path",
    "default": types_1.cliArgumentsDefault.compiler
})
    .option("format", {
    alias: "f",
    type: "string",
    description: "ddocs format",
    "default": types_1.cliArgumentsDefault.format
})
    .help()
    .alias("help", "h");
var logo = "\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n\u2588\u2500\u2588\u2500\u2588\u2500\u2500\u2588\u2500\u2500\u2588\u2500\u2500\u2500\u2500\u2588\u2588\u2500\u2500\u2500\u2500\u2588\u2500\u2500\u2500\u2500\u2588\n\u2588\u2500\u2588\u2500\u2588\u2588\u2500\u2500\u2500\u2588\u2588\u2500\u2588\u2588\u2500\u2500\u2588\u2500\u2588\u2588\u2500\u2588\u2500\u2588\u2588\u2500\u2588\n\u2588\u2500\u2588\u2500\u2588\u2588\u2588\u2500\u2588\u2588\u2588\u2500\u2588\u2588\u2500\u2500\u2588\u2500\u2588\u2588\u2500\u2588\u2500\u2588\u2588\u2588\u2588\n\u2588\u2500\u2500\u2500\u2588\u2588\u2588\u2500\u2588\u2588\u2588\u2500\u2588\u2588\u2500\u2500\u2588\u2500\u2588\u2588\u2500\u2588\u2500\u2588\u2588\u2500\u2588\n\u2588\u2588\u2500\u2588\u2588\u2588\u2588\u2500\u2588\u2588\u2588\u2500\u2500\u2500\u2500\u2588\u2588\u2500\u2500\u2500\u2500\u2588\u2500\u2500\u2500\u2500\u2588\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2500\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n";
exports.printCliArguments = ramda_1.pipe(ramda_1.pick(Object.keys(types_1.cliArgumentsDefault)), ramda_1.toPairs, table_1.makeTable({ head: ["VARIABLE", "VALUE"], colWidths: [15, 75] }), chalk_1.blue, ramda_1.concat(chalk_1.blue(logo) + "\n\n"), console.log);
