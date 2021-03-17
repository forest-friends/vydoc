"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _ejs = require("ejs");

var _ejs2 = _interopRequireDefault(_ejs);

var _cliProgress = require("cli-progress");

var _cliProgress2 = _interopRequireDefault(_cliProgress);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var argv = _yargs2.default.option("input", {
  alias: "i",
  type: "string",
  description: "contracts dir",
  default: "./contracts"
}).option("output", {
  alias: "o",
  type: "string",
  description: "docs output dir",
  default: "./docs"
}).option("compiler", {
  alias: "c",
  type: "string",
  description: "Vyper compiler path",
  default: "vyper"
}).help().alias("help", "h").argv;

console.log("Input contracts dir: " + argv.input);
console.log("Docs output dir:     " + argv.output);

var files = (0, _utils.getFileList)(argv.input, [".vy"]);
var ejsTemplate = _ejs2.default.compile(_fs2.default.readFileSync(_path2.default.join(__dirname, "../../src/template.ejs")).toString());

var bar = new _cliProgress2.default.SingleBar({ stopOnComplete: true }, _cliProgress2.default.Presets.shades_classic);
bar.start(files.length, 0);

files.map(function (file) {
  return _child_process2.default.exec("cd " + argv.input + " && cd .. && " + argv.compiler + " -f combined_json " + _path2.default.join(argv.input, file), function (err, stdout) {
    if (!err) {
      var contractDetail = JSON.parse(stdout);
      var contract = contractDetail[Object.keys(contractDetail)[0]];
      var methods = Object.keys(contract.method_identifiers).reduce(function (acc, method) {
        var gas = void 0,
            type = void 0,
            mutate = void 0;
        var fabi = contract.abi.filter(function (f) {
          return method.indexOf(f.name) != -1 && method.type != "event" || method.indexOf("__init__") != -1 && f.type === "constructor";
        });
        if (fabi.length > 0) {
          gas = fabi[0].gas;
          type = fabi[0].type;
          mutate = fabi[0].stateMutability;
        }

        return _extends({}, acc, _defineProperty({}, method, {
          hash: contract.method_identifiers[method],
          devdoc: contract.devdoc.methods && contract.devdoc.methods[method],
          userdoc: contract.userdoc.methods && contract.userdoc.methods[method],
          gas: gas,
          type: type,
          mutate: mutate
        }));
      }, {});

      // console.log(contract.abi);

      var result = ejsTemplate({
        contract: {
          methods: methods,
          abi: contract.abi,
          bytecode: contract.bytecode,
          contractName: file
        },
        version: contractDetail.version
      });

      _fs2.default.mkdirSync(_path2.default.join(argv.output, file, ".."), { recursive: true });
      _fs2.default.writeFileSync(_path2.default.join(argv.output, file).replace(/\.[^.]+$/, ".md").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), result);
    } else {
      console.error(err);
    }

    bar.increment();
  });
});