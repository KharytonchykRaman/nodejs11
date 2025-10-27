const fs = require("fs");
const path = require("path");
const mimeTypes = require("../utils/mimeTypes");

const control = (req, res) => {
  let filePath = path.join(__dirname, "..", "public", req.url);
  filePath = decodeURI(filePath);

  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "error", message: "Not found" }));
      return;
    }

    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
};

module.exports = control;