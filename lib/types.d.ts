export declare type CliArguments = {
    input: string;
    output: string;
    compiler: string;
    format: Format;
    template: string;
};
export declare type Format = "markdown";
export declare const cliArgumentsDefault: CliArguments;
export declare type Contract = {
    compilerVersion: number;
    abi: string;
    bytecode: string;
};
export declare type RawContract = {
    abi: AbiElement[];
    bytecode: string;
    devdoc: {
        author: string;
        license: string;
        title: string;
        notice: string;
        details: string;
        methods: {
            [key: string]: {
                details: string;
            };
        };
    };
    userdoc: {
        notice: string;
        methods: {
            [key: string]: {
                notice: string;
            };
        };
    };
};
export declare type AbiElement = {
    name: string;
    type: "event" | "function" | "constructor";
    inputs: {
        name: string;
        type: "string" | "uint256";
    }[];
};
