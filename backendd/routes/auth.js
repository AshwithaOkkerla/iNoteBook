const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Create a User using : POST '/api/auth/createUser'. no login required
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Pls enter more than 3char").isLength({ min: 3 }),
    body("password", "Pls enter more than 6char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      //check if email already exists
      let person = await User.findOne({ email: req.body.email });

      if (person) {
        return res
          .status(400)
          .json({ error: "Sorry a user with same email exists" });
      }
      //create a new user
      let user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      res.json({ DataEntry: "Successful", user });
    } catch (error) {
      console.log(error.message);
    }
    res.status(500).send("Some error occured");
  }
);

module.exports = router;
