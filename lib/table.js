"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.makeTable = void 0;
var cli_table_1 = __importDefault(require("cli-table"));
var makeTable = function (options) { return function (values) {
    var table = new cli_table_1["default"](options);
    table.push.apply(table, values);
    return table.toString();
}; };
exports.makeTable = makeTable;
