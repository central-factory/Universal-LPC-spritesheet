const fs = require("fs");

const path = require("path");

const renameSingleDirectory = (directory) => {
  const files = fs.readdirSync(directory);

  files
    .filter((f) => !f.startsWith("."))
    .forEach((file) => {
      const [name, extension] = file.split(".");

      try {
        fs.mkdirSync(path.join(directory, name));

        fs.renameSync(
          path.join(directory, file),
          path.join(directory, name, `Universal.${extension}`)
        );
      } catch (err) {
        console.warn(err.message);
      }

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
const bodyPartsFolder = `${humanoidsFolder}/bodyparts`;
const handsFolder = `${humanoidsFolder}/hands`;

const rootFolder = `${handsFolder}/rightHand/male`;

const directoriesInsideRootFolder = fs.readdirSync(rootFolder);

directoriesInsideRootFolder.forEach((directory) => {
  renameSingleDirectory(path.join(rootFolder, directory));
});

// renameSingleDirectory(`${bodyPartsFolder}/back/child/lizard_wings`);
