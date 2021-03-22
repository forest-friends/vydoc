"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.compileContracts = exports.compileContract = void 0;
var path_1 = require("path");
var child_process_1 = require("child_process");
var ramda_1 = require("ramda");
var ramda_async_1 = require("ramda-async");
var progress_1 = require("./progress");
var customExec = function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                return child_process_1.exec(cmd, function (error, stdout) { return (error ? reject(error) : resolve(stdout)); });
            })];
    });
}); };
var compileContract = function (dirPath, fileName, compilerPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customExec("cd " + dirPath + " && cd .. && " + compilerPath + " -f combined_json " + path_1.join(dirPath, fileName))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.compileContract = compileContract;
var transformContract = function (data, name) {
    var contract = ramda_1.head(Object.values(data));
    var abiMethods = contract.abi
        .filter(function (e) { return e.type === "function" || e.type === "constructor"; })
        .map(function (e) { return (__assign(__assign({}, e), { name: e.type === "constructor" ? "__init__" : e.name.replace(/\(.*/, "") })); })
        .reduce(function (acc, e) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a["" + e.name] = e, _a)));
    }, {});
    var methods = ramda_1.mergeWith(function (a, b) { return (__assign(__assign({}, a), b)); }, contract.devdoc.methods, contract.userdoc.methods);
    var r = {
        compilerVersion: data.version,
        abi: JSON.stringify(contract.abi, null, 2),
        bytecode: contract.bytecode,
        author: contract.devdoc.author,
        license: contract.devdoc.license,
        title: contract.devdoc.title,
        notice: contract.userdoc.notice,
        details: contract.devdoc.details,
        methods: Object.keys(methods).reduce(function (acc, method) {
            var _a;
            var methodName = method.replace(/\(.*/, "");
            return __assign(__assign({}, acc), (_a = {}, _a[method] = __assign(__assign({}, methods[method]), (abiMethods[methodName] ? abiMethods[methodName] : {})), _a));
        }, {}),
        events: contract.abi.filter(function (e) { return e.type === "event"; })
    };
    return r;
};
var compileContracts = function (dirPath, fileNames, compilerPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ramda_async_1.pipeAsync(progress_1.makeProgressBar, function (handler) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(fileNames.map(function (fileName) { return __awaiter(void 0, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = {
                                                fileName: fileName
                                            };
                                            return [4 /*yield*/, exports.compileContract(dirPath, fileName, compilerPath)
                                                    .then(JSON.parse)
                                                    .then(function (r) { return transformContract(r, fileName); })
                                                    .then(ramda_1.tap(handler))];
                                        case 1: return [2 /*return*/, (_a.data = _b.sent(),
                                                _a)];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); })(fileNames.length)];
    });
}); };
exports.compileContracts = compileContracts;
