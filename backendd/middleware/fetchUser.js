// var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "ashwithaisagoodgirl";

const fetchUser = (req, res, next) => {
  //get user from jwt token and add id to req obj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log("Done fetching User")
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
