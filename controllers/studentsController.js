const formidable = require("formidable");

const FileManager = require("../data/FileManager");
const DataManager = require("../data/DataManager");

const filterStudent = (req, res) => {
    let form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: UPLOAD_DIR,
    });

    
}

const filterGroups = (req, res) => {

}

const createStudent = (req, res) => {

}

const upload = (req, res) => {

}

const changeStatus = (req, res) => {

}


module.exports = { filterStudent, filterGroups, createStudent, upload, changeStatus }