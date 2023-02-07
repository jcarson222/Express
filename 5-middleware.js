const express = require("express");
const { use } = require("express/lib/application");
const req = require("express/lib/request");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
// req => middleware => res

const morgan = require("morgan");
// ^^^ third party middleware => (npm i morgan)
app.use(morgan("tiny"));
// ^^^ not sure yet why to use this. Ex: navigate to http://localhost:3000/api/contact --> GET /api/contact 304 - - 6.624 ms,, console.logs method being used, path, status code, upload time.

// INSERT LOGGER USING 'USE'
// app.use(logger);
// ^^^ this applies 'logger' to all
// app.use("/api", logger);
// ^^^ applying a path before 'logger' will apply 'logger' to all 'gets' containing the url of /api.

//app.use([logger, authorize]);
// ^^^ applies 'logger' and 'authorize' to all

// app.use(express.static('./public'))
// ^^^ this built in express method grabs all the content from './public' folder in this case, and makes it publicly available

// when using middleware (req, res, next), unless you are terminating the function w/ 'res', you MUST pass it on to the next middleware (your app.gets...)

// INSERT LOGGER MANUALLY:
// app.get("/", logger, (req, res) => {
//   res.send("Home");
// });

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/contact", (req, res) => {
  res.send("Contact");
});

app.listen(3000, () => {
  console.log("Server listening on port: 3000...");
});
