"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileList = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getFileList = exports.getFileList = function getFileList(dir, exts) {
  var re = "^.*.(" + exts.join("|") + ")$";

  return _fs2.default.readdirSync(dir, { withFileTypes: true }).reduce(function (acc, p) {
    return p.isDirectory() ? [].concat(_toConsumableArray(acc), _toConsumableArray(getFileList(_path2.default.join(dir, p.name), exts).map(function (cp) {
      return _path2.default.join(p.name, cp);
    }))) : [].concat(_toConsumableArray(acc), [p.name]);
  }, []).filter(function (filePath) {
    return filePath.match(re);
  });
};