const createError = require("http-errors");
const ObjectId = require("mongoose").Types.ObjectId;
const { readdir, readFile, rename } = require("fs/promises");
const { ROOT_PATH } = require(`${__dirname}/../constants/constants`);

const uploadAndRenameFile = (path, Model) => async (req, res, next) => {
  const uploadFolderPath = `${ROOT_PATH}/upload/${path}`;
  let files = [];

  try {
    const fileNames = await readdir(uploadFolderPath);

    if (!fileNames.length) {
      return res.render(
        "upload",
        { title: "failed", fileNames: "There is no file to upload" },
      );
    }

    for (const fileName of fileNames) {
      const file = JSON.parse((await readFile(`${uploadFolderPath}/${fileName}`, "utf8")));
      files.push(file);
    }

    for (const file of files) {
      for (const data of file) {
        delete data.id;
        await new Model(data).save();
      }
    }

    const uploadedFolderPath = `${__dirname}/../upload/uploaded`;

    for (const fileName of fileNames) {
      await rename(`${uploadFolderPath}/${fileName}`, `${uploadedFolderPath}/${fileName}`);
    }

    return res.render(
      "upload",
      { title: "success", fileNames },
    );
  } catch (error) {
    console.error(error);
    return next(createError(500), JSON.stringify(error));
  }
};

module.exports = uploadAndRenameFile;
