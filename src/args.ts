import { cliArgumentsDefault } from "./types";
import { pipe, concat, toPairs, pick } from "ramda";
import { option } from "yargs";
import { blue } from "chalk";
import { makeTable } from "./table";

export const options = option("input", {
  alias: "i",
  type: "string",
  description: "contracts dir",
  default: cliArgumentsDefault.input,
})
  .option("output", {
    alias: "o",
    type: "string",
    description: "docs output dir",
    default: cliArgumentsDefault.output,
  })
  .option("compiler", {
    alias: "c",
    type: "string",
    description: "Vyper compiler path",
    default: cliArgumentsDefault.compiler,
  })
  .option("format", {
    alias: "f",
    type: "string",
    description: "ddocs format",
    default: cliArgumentsDefault.format,
  })
  .option("template", {
    alias: "t",
    type: "string",
    description: "template to use",
    default: cliArgumentsDefault.template, 
  })
  .help()
  .alias("help", "h");

const logo = `
███████████████████████████
█─█─█──█──█────██────█────█
█─█─██───██─██──█─██─█─██─█
█─█─███─███─██──█─██─█─████
█───███─███─██──█─██─█─██─█
██─████─███────██────█────█
███████─███████████████████
`;

export const printCliArguments = pipe(
  pick(Object.keys(cliArgumentsDefault)),
  toPairs,
  makeTable({ head: ["VARIABLE", "VALUE"], colWidths: [15, 75] }),
  blue,
  concat(`${blue(logo)}\n\n`),
  console.log
);
