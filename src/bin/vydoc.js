import path from "path";
import fs from "fs";
import childProcess from "child_process";

import yargs from "yargs";
import ejs from "ejs";
import progress from "cli-progress";
import { getFileList } from "../utils";

const argv = yargs
  .option("input", {
    alias: "i",
    type: "string",
    description: "contracts dir",
    default: "./contracts",
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "docs output dir",
    default: "./docs",
  })
  .option("compiler", {
    alias: "c",
    type: "string",
    description: "Vyper compiler path",
    default: "vyper",
  })
  .help()
  .alias("help", "h").argv;

console.log(`Input contracts dir: ${argv.input}`);
console.log(`Docs output dir:     ${argv.output}`);

const files = getFileList(argv.input, [".vy"]);
const ejsTemplate = ejs.compile(
  fs.readFileSync(path.join(__dirname, "../../src/template.ejs")).toString()
);

const bar = new progress.SingleBar(
  { stopOnComplete: true },
  progress.Presets.shades_classic
);
bar.start(files.length, 0);

files.map((file) =>
  childProcess.exec(
    `cd ${argv.input} && cd .. && ${argv.compiler} -f combined_json ${path.join(
      argv.input,
      file
    )}`,
    (err, stdout) => {
      if (!err) {
        const contractDetail = JSON.parse(stdout);
        const contract = contractDetail[Object.keys(contractDetail)[0]];
        let methods = Object.keys(contract.method_identifiers).reduce(
          (acc, method) => {
            let gas, type, mutate;
            const fabi = contract.abi.filter(
              (f) =>
                (method.indexOf(f.name) != -1 && method.type != "event") ||
                (method.indexOf("__init__") != -1 && f.type === "constructor")
            );
            if (fabi.length > 0) {
              gas = fabi[0].gas;
              type = fabi[0].type;
              mutate = fabi[0].stateMutability;
            }

            return {
              ...acc,
              [method]: {
                hash: contract.method_identifiers[method],
                devdoc:
                  contract.devdoc.methods && contract.devdoc.methods[method],
                userdoc:
                  contract.userdoc.methods && contract.userdoc.methods[method],
                gas,
                type,
                mutate,
              },
            };
          },
          {}
        );

        // console.log(contract.abi);

        const result = ejsTemplate({
          contract: {
            methods,
            abi: contract.abi,
            bytecode: contract.bytecode,
            contractName: file,
          },
          version: contractDetail.version,
        });

        fs.mkdirSync(path.join(argv.output, file, ".."), { recursive: true });
        fs.writeFileSync(
          path
            .join(argv.output, file)
            .replace(/\.[^.]+$/, ".md")
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase(),
          result
        );
      } else {
        console.error(err);
      }

      bar.increment();
    }
  )
);
