import { Contract } from "./types";
export declare const compileContract: (dirPath: string, fileName: string, compilerPath: string) => Promise<string>;
export declare const compileContracts: (dirPath: string, fileNames: string[], compilerPath: string) => Promise<{
    fileName: string;
    data: Contract;
}[]>;
