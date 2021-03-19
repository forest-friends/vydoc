/// <reference types="yargs" />
export declare const options: import("yargs").Argv<{
    input: string;
} & {
    output: string;
} & {
    compiler: string;
} & {
    format: "markdown";
}>;
export declare const printCliArguments: (x: unknown) => void;
