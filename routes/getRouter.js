const fs = require("fs");
const path = require("path");
const url = require("url");

const { getRandomInt } = require("../utils/index");
const staticFilesController = require("../controllers/staticFilesController");
const studentsController = require("../controllers/studentsController");

const getRouter = (req, res) => {
  const parsedUrl = url.parse(req.url, false);
  switch (parsedUrl.pathname) {
    case "/":
      fs.createReadStream(
        path.join(__dirname, "..", "public", "index.html")
      ).pipe(res);я
      break;

    case "/get-random-img":
      const imgs = fs.readdirSync(path.join(__dirname, "..", "public", "img"));
      const img = imgs[getRandomInt(0, imgs.length - 1)];
      res.writeHead(302, { location: `/img/${img}` });
      break;

    case "get-students-dump":
      studentsController.getStudentsDump(req, res);

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
