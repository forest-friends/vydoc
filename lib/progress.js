"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.makeProgressBar = void 0;
var cli_progress_1 = __importDefault(require("cli-progress"));
var makeProgressBar = function (length, options, preset) {
    if (options === void 0) { options = { stopOnComplete: true }; }
    if (preset === void 0) { preset = cli_progress_1["default"].Presets.shades_classic; }
    var bar = new cli_progress_1["default"].SingleBar(options, preset);
    bar.start(length, 0);
    return function () { return bar.increment(); };
};
exports.makeProgressBar = makeProgressBar;
