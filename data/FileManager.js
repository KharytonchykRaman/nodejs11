const fs = require("fs");
const path = require("path");

const STUDENTS_JSON = path.join(__dirname,"students.json");

const getStudents = () => {
    return JSON.stringify(fs.readFileSync(STUDENTS_JSON));
}

const start = () => {
    if (!fs.existsSync(STUDENTS_JSON)) {
        fs.writeFileSync(STUDENTS_JSON,"[]");
    }
}

start();

module.exports = {getStudents}