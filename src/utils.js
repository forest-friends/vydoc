import fs from "fs";
import path from "path";

export const getFileList = (dir, exts) => {
  const re = `^.*\.(${exts.join("|")})$`;

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .reduce(
      (acc, p) =>
        p.isDirectory()
          ? [
              ...acc,
              ...getFileList(path.join(dir, p.name), exts).map((cp) =>
                path.join(p.name, cp)
              ),
            ]
          : [...acc, p.name],
      []
    )
    .filter((filePath) => filePath.match(re));
};
