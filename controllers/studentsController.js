const path = require("path");
const formidable = require("formidable");

const FileManager = require("../data/FileManager");
const DataManager = require("../data/DataManager");

const filterStudent = (req, res) => {
  let form = new formidable.IncomingForm({
    keepExtensions: true,
    uploadDir: FileManager.UPLOAD_DIR,
  });

  form.on("fileBegin", (name, file) => {
    if (
      !FileManager.availableExtnames.some(
        (ext) => path.extname(file.filepath) === ext
      )
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "error",
          message: "not allowed file extname",
        })
      );
    }

    file.filepath = path.join(FileManager.UPLOAD_DIR, file.originalFilename);
  });
};

const filterGroups = (req, res) => {};

const createStudent = (req, res) => {};

const upload = (req, res) => {};

const changeStatus = (req, res) => {};

module.exports = {
  filterStudent,
  filterGroups,
  createStudent,
  upload,
  changeStatus,
};
