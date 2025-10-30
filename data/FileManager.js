const fs = require("fs");
const path = require("path");

const STUDENTS_JSON = path.join(__dirname, "students.json");
const UPLOAD_DIR = path.join(__dirname, "..", "public", "upload");
const UPLOAD_DIRS_BY_TYPE = {
  text: path.join(UPLOAD_DIR, "text"),
  img: path.join(UPLOAD_DIR, "img"),
};

const availableExtnames = {
  text: [".txt", ".pdf", ".docx"],
  img: [".png", ".jpg", ".jpeg", ".webp"],
};

const getUploadDirByExtname = (extname) => {
  const normalizedExt = extname.toLowerCase();
  for (const [type, extensions] of Object.entries(availableExtnames)) {
    if (extensions.includes(normalizedExt)) {
      return UPLOAD_DIRS_BY_TYPE[type];
    }
  }
  throw new Error(`Unsupported file extension: "${extname}"`);
};

const getStudents = () => {
  return JSON.parse(fs.readFileSync(STUDENTS_JSON));
};

const initConfig = (configFile) => {
  fs.writeFileSync(STUDENTS_JSON, fs.readFileSync(configFile.filepath));
};

const updateStorage = (list) => {
  fs.writeFileSync(STUDENTS_JSON, JSON.stringify(list));
};

const start = () => {
  if (!fs.existsSync(STUDENTS_JSON)) {
    fs.writeFileSync(STUDENTS_JSON, "[]");
  }
  for (const key in UPLOAD_DIRS_BY_TYPE) {
    if (!fs.existsSync(UPLOAD_DIRS_BY_TYPE[key])) {
      fs.mkdirSync(UPLOAD_DIRS_BY_TYPE[key], { recursive: true });
    }
  }
};

start();

module.exports = {
  getStudents,
  availableExtnames,
  getUploadDirByExtname,
  initConfig,
  updateStorage,
};
