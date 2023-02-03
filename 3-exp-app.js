const express = require("express");
const app = express();
const path = require("path");

// setup static and middleware
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "/.navbar-app/index.html"));
// });
// ^^^ this added to public folder

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(3000, () => {
  console.log("server listening on port: 3000");
});
