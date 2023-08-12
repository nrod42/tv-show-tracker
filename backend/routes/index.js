const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "osdjkgfnesfg9-303";

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/public", "index.html"));
});

router.post("/register", async function (req, res) {
  const { email, username, password, firstName, lastName } = req.body;
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
  if (userDoc) {
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
          });
        }
      );
    } else {
      res.status(400).json("wrong credentials");
    }
  } else {
    res.status(400).json("wrong credentials");
  }
});

router.get("/lists/:userId", async function (req, res) {
  const { userId } = req.params;
  res.json(await User.findById(userId));
});

router.put(
  "/users/:userId/lists/:watchList/:mediaType/:mediaId",
  async function (req, res) {
    try {
      const { userId, watchList, mediaType, mediaId } = req.params;
      const newMediaType = mediaType === "movie" ? "movies" : "tvShows";
      const user = await User.findById(userId);
      // This should add the media id to the correct array

      await user.updateOne({
        $addToSet: { [`${watchList}.${newMediaType}`]: mediaId },
      });
      const updatedUser = await User.findById(userId);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete(
  "/users/:userId/lists/:watchList/:mediaType/:mediaId",
  async function (req, res) {
    try {
      const { userId, watchList, mediaType, mediaId } = req.params;
      const newMediaType = mediaType === "movie" ? "movies" : "tvShows";

      //write function to find id in correct list and remove it
      await User.findByIdAndUpdate(userId, {
        $pull: { [`${watchList}.${newMediaType}`]: mediaId },
      });

      const updatedUser = await User.findById(userId);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
