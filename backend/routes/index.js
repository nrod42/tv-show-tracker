const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "osdjkgfnesfg9-303";

router.post("/register", async function (req, res) {
  const { email, username, password, firstName, lastName } = req.body;
  console.log(req.body);
  try {
    const userDoc = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, salt),
      firstName,
      lastName,
    });
    res.json(userDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  const expiresIn = "1d";

  if (passOk) {
    jwt.sign(
      { username, id: userDoc._id },
      secret,
      { expiresIn },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
          watching,
          completed,
          planning,
          dropped,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

router.get("/lists", async function (req, res) {
  const { user_id } = req.body;
  res.json(await User.findById(user_id));
});

module.exports = router;
