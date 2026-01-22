const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Working");
});
app.get("/home", (req, res) => {
  res.send("This is Home");
});
app.get("/about", (req, res) => {
  res.send("This is About");
});

app.listen(3000);
