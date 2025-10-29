const fs = require("fs");
const path = require("path");
const { upload } = require("../controllers/studentsController");

const STUDENTS_JSON = path.join(__dirname, "students.json");
const UPLOAD_DIR = path.join(__dirname, "upload");
const UPLOAD_DIRS_BY_TYPE = [
  path.join(UPLOAD_DIR, "text"),
  path.join(UPLOAD_DIR, "img"),
];

const availableExtnames = ["txt", "pdf", "docx", "png", "jpg", "jpeg", "webp"];

const getStudents = () => {
  return JSON.stringify(fs.readFileSync(STUDENTS_JSON));
};

const start = () => {
  if (!fs.existsSync(STUDENTS_JSON)) {
    fs.writeFileSync(STUDENTS_JSON, "[]");
  }
  for (const dir of UPLOAD_DIRS_BY_TYPE) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
};

start();

module.exports = { getStudents, availableExtnames, UPLOAD_DIR };
