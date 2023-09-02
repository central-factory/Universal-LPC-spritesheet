const fs = require("fs");

const path = require("path");

const renameSingleDirectory = (directory) => {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const [name, extension] = file.split(".");

    fs.mkdirSync(path.join(directory, name));

    fs.renameSync(
      path.join(directory, file),
      path.join(directory, name, `Universal.${extension}`)
    );

    console.log(
      `Renamed ${file} to ${path.join(
        directory,
        name,
        `Universal.${extension}`
      )}`
    );
  });
};

const rootFolder = "./assets2/characters/humanoids/bodyParts/facialHair/male";

const directoriesInsideRootFolder = fs.readdirSync(rootFolder);

directoriesInsideRootFolder.forEach((directory) => {
  renameSingleDirectory(path.join(rootFolder, directory));
});
