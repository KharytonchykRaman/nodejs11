/*
https://itstepby-my.sharepoint.com/:w:/r/personal/skorbilin_a_teacher_itstep_by/_layouts/15/Doc.aspx?sourcedoc=%7B0D383215-D7B1-4C4C-BADB-055940E5897A%7D&file=Task.docx&action=default&mobileredirect=true
*/

const http = require("http");
const handler = require("./routes/index");

const PORT = 5000;

http
  .createServer(handler)
  .listen(PORT, () => console.log(`http://localhost:${PORT}/`));
