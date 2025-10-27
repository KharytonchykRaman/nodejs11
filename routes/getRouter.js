const fs = require("fs");
const path = require("path");
const url = require("url");

const staticFilesController = require("../controllers/staticFilesController");
const studentsController = require("../controllers/studentsController");

const getRouter = (req, res) => {
  const parsedUrl = url.parse(req.url, false);
  switch (parsedUrl.pathname) {
    case "/":
      fs.createReadStream(
        path.join(__dirname, "..", "public", "index.html")
      ).pipe(res);
      break;

    case "/admin/filter-student":
      studentsController.filterStudent(req, res);
      break;

    case "/admin/filter-groups":
      studentsController.filterGroups(req, res);
      break;

    default:
      staticFilesController(req, res);
      break;
  }
};

module.exports = getRouter;
