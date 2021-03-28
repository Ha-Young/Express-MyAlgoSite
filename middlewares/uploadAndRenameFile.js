const createError = require("http-errors");
const { readdir, readFile, rename } = require("fs/promises");

const uploadAndRenameFile = (path, Model) => {
  return async (req, res, next) => {
    const uploadFolderPath = `${__dirname}/../upload/${path}`;
    let datum = [];

    try {
      const fileNames = await readdir(uploadFolderPath);

      if (!fileNames.length) {
        return res.render(
          "upload",
          { title: "failed", fileNames: "There is no file to upload" },
        );
      }

      for (const fileName of fileNames) {
        const file
          = await readFile(`${uploadFolderPath}/${fileName}`, "utf8");
        const data = JSON.parse(file);
        datum.push(data);
      }

      for (const data of datum) {
        for (const document of data) {
          delete document.id;
          await new Model(document).save();
        }
      }

      const uploadedFolderPath = `${__dirname}/../upload/uploaded`;

      for (const fileName of fileNames) {
        await rename(
          `${uploadFolderPath}/${fileName}`,
          `${uploadedFolderPath}/${fileName}`,
        );
      }

      res.locals = { title: "success", fileNames };

      return res.render("upload");
    } catch (error) {
      console.error(error);

      return next(createError(500), JSON.stringify(error));
    }
  }
};

module.exports = uploadAndRenameFile;
