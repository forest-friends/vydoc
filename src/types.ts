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
};

export type RawContract = {
  abi: Object;
  bytecode: string;
};
