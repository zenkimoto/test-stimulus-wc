const path = require("path");
const express = require("express");

const app = express();
const port = 3000;
const public = path.join(__dirname, "./dist");

app.use(express.static(public));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
})