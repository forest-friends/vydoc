import { readdirSync } from "fs";
import { join } from "path";
import { pipe } from "ramda";

const makeExtensionsRegExp = (exts: string[]): string =>
  `^.*\.(${exts.join("|")})$`;

export const getRecursiveFilesByExtensions = (
  rootDir: string,
  exts: string[]
): string[] =>
  pipe(makeExtensionsRegExp, (re) =>
    readdirSync(rootDir, { withFileTypes: true })
      .reduce(
        (acc: string[], node): string[] => [
          ...acc,
          ...(node.isDirectory()
            ? getRecursiveFilesByExtensions(
                join(rootDir, node.name),
                exts
              ).map((cp) => join(node.name, cp))
            : [node.name]),
        ],
        []
      )
      .filter((filePath: string) => filePath.match(re))
  )(exts);
