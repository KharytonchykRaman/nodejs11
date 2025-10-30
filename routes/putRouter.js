const studentsController = require("../controllers/studentsController");

const putRouter = (req, res) => {
  switch (req.url) {
    case "/admin/kick-student":
      studentsController.kickStudent(req, res);
      break;

    case "/admin/set-vocation":
      studentsController.setVacation(req, res);
      break;

    default:
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "error", message: "Bad Request" }));
      break;
  }
};

module.exports = putRouter;
