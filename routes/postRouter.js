const studentsController = require("../controllers/studentsController");

const postRouter = (req, res) => {
  switch (req.url) {
    case "/admin/create-student":
      studentsController.createStudent(req, res);
      break;

    case "/admin/upload":
      studentsController.upload(req, res);
      break;

    case "/admin/change-status":
      studentsController.changeStatus(req, res);
      break;

    default:
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "error", message: "Bad Request" }));
      break;
  }
};

module.exports = postRouter;
