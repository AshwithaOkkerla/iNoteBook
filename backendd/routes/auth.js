const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "ashwithaisagoodgirl";

//Route1 : Create a User using : POST '/api/auth/createUser'. no login required
router.post(
  "/createUser",
  [
    body("name", "Pls enter more than 3char").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
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
      const salt = await bcrypt.genSaltSync(10);
      const securePswd = await bcrypt.hash(req.body.password, salt);

      //create a new user
      let user = await User.create({
        name: req.body.name,
        password: securePswd,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      res.json({ DataEntry: "Successful", authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route2: authenticating user using: POST '/api/auth/login'

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "cannot be empty").exists(),
  ],
  async (req, res) => {
    //if there are errors return
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    //no errors found in req body
    const { email, password } = req.body;
    try {
      let person = await User.findOne({ email });
      if (!person) {
        return res
          .status(400)
          .json({ error: "Please login with crct credentials" });
      }
      //compare the pswd entered by user and hashstring stored for that particular email , first the User entered pswd is converted to hashstring and then compared
      const pswdCompare = await bcrypt.compare(password, person.password);
      if (!pswdCompare) {
        return res
          .status(400)
          .json({ error: "Please login with crct credentials" });
      }
      //pswd is matched
      const data = {
        user: {
          id: person.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //   console.log(authToken);

      res.json({ authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//Route3: Get logged User Details: POST '/api/auth/getUser'.
router.post(
  "/getUser",
	fetchUser,
  async (req, res) => {

    try {
      userId = req.user.id;
	  console.log(userId)
      const person = await User.findById(userId ).select("-password");
	//   console.log(person)
	  res.send(person)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

module.exports = router;
