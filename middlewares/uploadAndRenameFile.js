const createError = require("http-errors");
const { readdir, readFile, rename } = require("fs/promises");

const uploadAndRenameFile = (path, Model) => {
  return async (req, res, next) => {
    const uploadFolderPath = `${__dirname}/../upload/${path}`;

    try {
      const fileNames = await readdir(uploadFolderPath);

      if (!fileNames.length) {
        return res.render(
          "upload",
          { title: "failed", fileNames: "There is no file to upload" },
        );
      }

      const readFiles = fileNames.map(async fileName => {
        const file = await readFile(`${uploadFolderPath}/${fileName}`, "utf8");

        return JSON.parse(file);
      });

      const datum = await Promise.all(readFiles);
      const uploads = datum.map(data => {
        const docs = data.map(document => {
          delete document.id;

          return new Model(document).save();
        });

        return Promise.all(docs);
      });

      await Promise.all(uploads);

      const uploadedFolderPath = `${__dirname}/../upload/uploaded`;

      const renameFiles = fileNames.map(fileName => {
        return rename(
          `${uploadFolderPath}/${fileName}`,
          `${uploadedFolderPath}/${fileName}`,
        );
      });

      await Promise.all(renameFiles);

      const renderProps = { title: "success", fileNames };

      return res.render("upload", renderProps);
    } catch (error) {
      console.error(error);

      return next(createError(500), JSON.stringify(error));
    }
  }
};

module.exports = uploadAndRenameFile;
