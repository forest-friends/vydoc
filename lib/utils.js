"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getRecursiveFilesByExtensions = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var ramda_1 = require("ramda");
var makeExtensionsRegExp = function (exts) {
    return "^.*.(" + exts.join("|") + ")$";
};
var getRecursiveFilesByExtensions = function (rootDir, exts) {
    return ramda_1.pipe(makeExtensionsRegExp, function (re) {
        return fs_1.readdirSync(rootDir, { withFileTypes: true })
            .reduce(function (acc, node) { return __spreadArray(__spreadArray([], acc), (node.isDirectory()
            ? exports.getRecursiveFilesByExtensions(path_1.join(rootDir, node.name), exts).map(function (cp) { return path_1.join(node.name, cp); })
            : [node.name])); }, [])
            .filter(function (filePath) { return filePath.match(re); });
    })(exts);
};
exports.getRecursiveFilesByExtensions = getRecursiveFilesByExtensions;
