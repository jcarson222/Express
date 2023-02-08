const express = require("express");
const router = express.Router();
let { people } = require("../data");

// the path for the following routes is only '/' because the "app.use("api/people", people)" in our app.js already defines the path "api/people".

// GET
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// POST
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

router.post("/postman", (req, res) => {
  // ^^^ path was "api/people/postman"
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

// PUT
router.put("/:id", (req, res) => {
  // ^^^ path was "api/people/:id"
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

// DELETE
router.delete("/:id", (req, res) => {
  // ^^^ path was "api/people/:id"
  const { id } = req.params;
  // ^^^ instead of destructuring 'id', you can also just use req.params.id throughout.
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));

  res.status(200).json({ success: true, data: newPeople });
});

module.exports = router;
