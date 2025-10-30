const path = require("path");
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
      fields.firstName,
      fields.secondName,
      fields.thirdName,
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

  let uploadDir = "";

  form.on("fileBegin", (name, file) => {
    const extname = path.extname(file.originalFilename);

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
    DataManager.add({
      ...fields,
      avatar: uploadDir.split("/public").at(-1),
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

    if (validateJSONconfig(files.upload[0])) {
      FileManager.initConfig(files.upload[0]);

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
  let data = "";
  req.on("data", (chunk) => (data += chunk));

  req.on("end", () => {
    const clientData = JSON.parse(data);

    try {
      DataManager.kickStudent(clientData.id);

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
  let data = "";
  req.on("data", (chunk) => (data += chunk));

  req.on("end", () => {
    const clientData = JSON.parse(data);

    try {
      DataManager.setVacation(clientData.id);

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
  getStudentsDump
};
