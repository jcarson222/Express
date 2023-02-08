const express = require("express");
const router = express.Router();
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

// the path for the following routes is only '/' because the "app.use("api/people", people)" in our app.js already defines the path "api/people".

router.get("/", getPeople);
router.post("/", createPerson);
router.post("/postman", createPersonPostman);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);
// ^^^ I LIKE THIS ONE BETTER ^^^

// or chain all routes in one line:
// router
//   .route("/")
//   .get(getPeople)
//   .post(createPerson);

// router.route("/postman").post(createPersonPostman);
// router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
