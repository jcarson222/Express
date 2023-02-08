const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

//static assets
app.use(express.static("./methods-public"));
// ^^^ ONLY WHEN TESTING THROUGH A FRONT END (not postman)

// parse form (html <form action="/login" method="POST">) data
app.use(express.urlencoded({ extended: false }));
// ^^^ This gives us access to the form <input> values
// ^^^ ONLY WHEN TESTING THROUGH A FRONT END (not postman)

// parse json
app.use(express.json());

// people routes
app.use("/api/people", people);

// authorize routes
app.use("/login", auth);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SERVER LISTEN
app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
