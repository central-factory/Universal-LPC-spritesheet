// Recursively generate a JSON index for each directory in the given path

const fs = require("fs");

const path = require("path");

const generateDirectoryIndex = (dirPath) => {
  const dirIndex = {};

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      dirIndex[file] = generateDirectoryIndex(filePath);
    } else {
      if (file.endsWith(".json")) {
        return;
      }

      const name = file.split(".")[0];

      dirIndex[name] = file;
    }
  });

  fs.writeFileSync(
    path.join(dirPath, "index.json"),
    JSON.stringify(dirIndex, null, 2)
  );

  console.log(dirIndex);

  return dirIndex;
};

const dirIndex = generateDirectoryIndex("./assets2");
