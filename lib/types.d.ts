export declare type CliArguments = {
    input: string;
    output: string;
    compiler: string;
    format: Format;
};
export declare type Format = "markdown";
export declare const cliArgumentsDefault: CliArguments;
export declare type Contract = {
    compilerVersion: number;
    abi: string;
};
export declare type RawContract = {
    abi: Object;
    bytecode: string;
};
