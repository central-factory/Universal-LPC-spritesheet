const fs = require("fs");

const path = require("path");

const renameSingleDirectory = (directory) => {
  const files = fs.readdirSync(directory);

  files
    .filter((f) => !f.startsWith("."))
    .forEach((file) => {
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

const humanoidsFolder = "./assets2/characters/humanoids";
const clothesFolder = `${humanoidsFolder}/clothes`;

const rootFolder = `${clothesFolder}/arms/male/armor`;

const directoriesInsideRootFolder = fs.readdirSync(rootFolder);

directoriesInsideRootFolder.forEach((directory) => {
  renameSingleDirectory(path.join(rootFolder, directory));
});

// renameSingleDirectory(`${clothesFolder}/torso/male/vest/pirate_open`);
