import ejs from "ejs";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { cond, equals, pipe, T, tap } from "ramda";
import { makeProgressBar } from "./progress";
import { Contract, Format } from "./types";

export const generateDocs = async (
  format: Format,
  output: string,
  contracts: { fileName: string; data: Contract }[]
) =>
  cond<Format, any>([
    [equals("markdown"), () => generateMarkDown(contracts, output)],
    [
      T,
      () => {
        throw new Error("invalid format");
      },
    ],
  ])(format);

const generateMarkDown = async (
  contracts: { fileName: string; data: Contract }[],
  output: string
) =>
  pipe(
    readFileSync,
    (buffer) => buffer.toString(),
    ejs.compile,
    (template) =>
      pipe((handler: () => void) =>
        contracts
          .map(
            tap((contract) =>
              mkdirSync(join(output, contract.fileName, ".."), {
                recursive: true,
              })
            )
          )
          .map(
            tap((contract) =>
              writeFileSync(
                join(output, contract.fileName)
                  .replace(/\.[^.]+$/, ".md")
                  .replace(/([a-z])([A-Z])/g, "$1-$2")
                  .toLowerCase(),
                template(contract).toString()
              )
            )
          )
          .map(tap(handler))
      )(makeProgressBar(contracts.length))
    // (template) => contracts.map((contract) => template(contract)),
    // tap(console.log)
  )(join(__dirname, "../src/templates/markdown.ejs"));

//   // const result = ejsTemplate({
//   //             contract: {
//   //               methods,
//   //               abi: contract.abi,
//   //               bytecode: contract.bytecode,
//   //               contractName: file,
//   //             },
//   //             version: contractDetail.version,
//   //           });

//   //           fs.mkdirSync(path.join(argv.output, file, ".."), { recursive: true });
//   //           fs.writeFileSync(
//   //             path
//   //               .join(argv.output, file)
//   //               .replace(/\.[^.]+$/, ".md")
//   //               .replace(/([a-z])([A-Z])/g, "$1-$2")
//   //               .toLowerCase(),
//   //             result
//   //           );
// };

// files.map((file) =>
//   childProcess.exec(
//     `cd ${argv.input} && cd .. && ${argv.compiler} -f combined_json ${path.join(
//       argv.input,
//       file
//     )}`,
//     (err, stdout) => {
//       if (!err) {
//         const contractDetail = JSON.parse(stdout);
//         const contract = contractDetail[Object.keys(contractDetail)[0]];
//         let methods = Object.keys(contract.method_identifiers).reduce(
//           (acc, method) => {
//             let gas, type, mutate;
//             const fabi = contract.abi.filter(
//               (f) =>
//                 (method.indexOf(f.name) != -1 && method.type != "event") ||
//                 (method.indexOf("__init__") != -1 && f.type === "constructor")
//             );
//             if (fabi.length > 0) {
//               gas = fabi[0].gas;
//               type = fabi[0].type;
//               mutate = fabi[0].stateMutability;
//             }

//             return {
//               ...acc,
//               [method]: {
//                 hash: contract.method_identifiers[method],
//                 devdoc:
//                   contract.devdoc.methods && contract.devdoc.methods[method],
//                 userdoc:
//                   contract.userdoc.methods && contract.userdoc.methods[method],
//                 gas,
//                 type,
//                 mutate,
//               },
//             };
//           },
//           {}
//         );

//         // console.log(contract.abi);

//         const result = ejsTemplate({
//           contract: {
//             methods,
//             abi: contract.abi,
//             bytecode: contract.bytecode,
//             contractName: file,
//           },
//           version: contractDetail.version,
//         });

//         fs.mkdirSync(path.join(argv.output, file, ".."), { recursive: true });
//         fs.writeFileSync(
//           path
//             .join(argv.output, file)
//             .replace(/\.[^.]+$/, ".md")
//             .replace(/([a-z])([A-Z])/g, "$1-$2")
//             .toLowerCase(),
//           result
//         );
//       } else {
//         console.error(err);
//       }

//       bar.increment();
//     }
//   )
// );
