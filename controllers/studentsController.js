const path = require("path");
const formidable = require("formidable");

const { flattenObject } = require("../utils/index");
const FileManager = require("../data/FileManager");
const DataManager = require("../data/DataManager");

const filterStudent = (req, res) => {
  let form = new formidable.IncomingForm({
    keepExtensions: true,
  });

  form.on("fileBegin", (name, file) => {
    const extname = path.extname(file.originalFilename);

    let uploadDir;

    try {
      uploadDir = FileManager.getUploadDirByExtname(extname);
      file.filepath = path.join(uploadDir, file.originalFilename);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "error",
          message: err.message,
        })
      );
    }
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      response.writeHead(400, { "Content-Type": "application/json" });
      return response.end(JSON.stringify({
        status: "error",
        message: err.message || "Некорректно заполненная форма"
      }));
    }

    userFields = flattenObject(userFields);

    DataManager.add({
      ...userFields,
      avatar: path.basename(files.avatarImgName[0].filepath),
    });

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      status: "success",
      message: "Данные добавлены"
    }));

  })
};

const filterGroups = (req, res) => {

};

const createStudent = (req, res) => { };

const upload = (req, res) => { };

const changeStatus = (req, res) => { };

module.exports = {
  filterStudent,
  filterGroups,
  createStudent,
  upload,
  changeStatus,
};
