const fs = require("fs");
const { studentKeys } = require("../data/DataManager");

const flattenObject = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].length > 0) {
      result[key] = obj[key][0];
    }
  }
  return result;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function isJsonFile(file) {
  try {
    const stats = fs.statSync(file.filepath);
    if (!stats.isFile()) {
      return false;
    }

    const content = fs.readFileSync(file.filepath, "utf8");

    JSON.parse(content);

    return true;
  } catch (err) {
    return false;
  }
}

const validateJSONconfig = (file) => {
  if (!isJsonFile(file)) {
    return false;
  }

  const students = JSON.parse(fs.readFileSync(file.filepath));

  return (
    Array.isArray(students) &&
    students.every((st) => {
      if (st === null || typeof st !== "object" || Array.isArray(st)) {
        return false;
      }

      const keys = Object.keys(st);
      if (keys.length !== studentKeys.length) {
        return false;
      }

      for (const key in st) {
        if (!studentKeys.includes(key)) {
          return false;
        }

        if (key === "id") {
          return Number.isInteger(st[key]);
        } else if (key === "isKicked" || key === "isVacation") {
          return typeof st[key] === "boolean";
        } else return typeof variable === "string" && variable.length < 50;
      }
    })
  );
};

module.exports = { flattenObject, getRandomInt, validateJSONconfig };
