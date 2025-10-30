const getRouter = require("./getRouter");
const postRouter = require("./postRouter");
const putRouter = require("./putRouter");

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      getRouter(req, res);
      break;

    case "POST":
      postRouter(req, res);
      break;

    case "PUT":
      putRouter(req, res);
      break;

    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: "error", message: "Method Not Allowed" })
      );
      break;
  }
};

module.exports = handler;
