export type CliArguments = {
  input: string;
  output: string;
  compiler: string;
  format: Format;
};

export type Format = "markdown";

export const cliArgumentsDefault = {
  input: "./contracts",
  output: "./docs",
  compiler: "vyper",
  format: "markdown",
} as CliArguments;

export type Contract = {
  compilerVersion: number;
  abi: string;
  bytecode: string;
};

export type RawContract = {
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

export type AbiElement = {
  name: string;
  type: "event" | "function" | "constructor";
  inputs: {
    name: string;
    type: "string" | "uint256";
  }[];
};
