const path = require("path");
const fs = require("fs");
const url = require("url");
const formidable = require("formidable");

const { flattenObject, validateJSONconfig } = require("../utils/index");
const FileManager = require("../data/FileManager");
const DataManager = require("../data/DataManager");

const filterStudent = (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "error",
          message: err.message || "Некорректно заполненная форма",
        })
      );
    }

    fields = flattenObject(fields);

    const filteredStudents = DataManager.filter(
      fields.fullName,
      fields.email,
      fields.speciality
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filteredStudents));
  });
};

const filterGroups = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "error",
          message: err.message || "Некорректно заполненная форма",
        })
      );
    }

    fields = flattenObject(fields);

    const groupsBySpeciality = DataManager.getGroup(fields.speciality);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(groupsBySpeciality));
  });
};

const createStudent = (req, res) => {
  let form = new formidable.IncomingForm({
    keepExtensions: true,
  });

  form.on("fileBegin", (name, file) => {
    const extname = path.extname(file.originalFilename);

    let uploadDir = "";

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
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "error",
          message: err.message || "Некорректно заполненная форма",
        })
      );
    }

    fields = flattenObject(fields);

    let infoFilePath = "";
    if (!files.info) {
      infoFilePath = path.join(
        FileManager.getUploadDirByExtname(".txt"),
        `${fields.secondName}.txt`
      );
      fs.writeFileSync(infoFilePath, "No info about this student");
    }

    DataManager.add({
      ...fields,
      avatar: files.avatarImg.filepath.split("/public").at(-1),
      info: files?.info.filepath.split("/public").at(-1) || infoFilePath,
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "success",
        message: "Данные добавлены",
      })
    );
  });
};

const upload = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "error",
          message: err.message || "Некорректно заполненная форма",
        })
      );
    }

    if (validateJSONconfig(files.config[0])) {
      FileManager.initConfig(files.config[0]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "success",
          message: "Config uploaded",
        })
      );
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "error",
          message: "Bad JSON file",
        })
      );
    }
  });
};

const kickStudent = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "error",
          message: err.message || "Некорректно заполненная форма",
        })
      );
    }

    try {
      DataManager.kickStudent(fields.id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "success",
          message: "Student kicked",
        })
      );
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
};

const setVacation = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "error",
          message: err.message || "Некорректно заполненная форма",
        })
      );
    }

    try {
      DataManager.setVacation(fields.id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "success",
          message: "Student is on vacation",
        })
      );
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
};

const getStudentsDump = (req, res) => {
  const queryObj = url.parse(req.url, true).query;

  const filteredStudents = DataManager.filter(
    queryObj.firstName,
    queryObj.secondName,
    queryObj.thirdName,
    queryObj.email,
    queryObj.speciality
  );
  const jsonData = JSON.stringify(filteredStudents, null, "\t");

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Disposition": "attachment; filename=students.json",
  });

  res.end(jsonData);
};

module.exports = {
  filterStudent,
  filterGroups,
  createStudent,
  upload,
  kickStudent,
  setVacation,
  getStudentsDump,
};
