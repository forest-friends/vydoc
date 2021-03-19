import progress from "cli-progress";
import { join } from "path";
import { exec } from "child_process";
import { compose, pipe, tap, map, head } from "ramda";
import { pipeAsync } from "ramda-async";
import { makeProgressBar } from "./progress";
import { Contract, RawContract } from "./types";

const customExec = async (cmd: string): Promise<string> =>
  new Promise((resolve, reject) =>
    exec(cmd, (error, stdout) => (error ? reject(error) : resolve(stdout)))
  );

export const compileContract = async (
  dirPath: string,
  fileName: string,
  compilerPath: string
) =>
  await customExec(
    `cd ${dirPath} && cd .. && ${compilerPath} -f combined_json ${join(
      dirPath,
      fileName
    )}`
  );

const transformContract = (data: any, name: string): Contract => {
  const contract = head(Object.values(data)) as RawContract;
  const r = {
    compilerVersion: data.version,
    abi: JSON.stringify(contract.abi, null, 2),
  };
  // console.log(contract.bytecode);
  return r;
};

export const compileContracts = async (
  dirPath: string,
  fileNames: string[],
  compilerPath: string
): Promise<{ fileName: string; data: Contract }[]> =>
  pipeAsync(
    makeProgressBar,
    async (handler) =>
      await Promise.all(
        fileNames.map(async (fileName) => ({
          fileName,
          data: await compileContract(dirPath, fileName, compilerPath)
            .then(JSON.parse)
            .then((r) => transformContract(r, fileName))
            .then(tap(handler)),
        }))
      )
  )(fileNames.length);
