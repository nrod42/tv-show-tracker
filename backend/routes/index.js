const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "osdjkgfnesfg9-303";

// Route to handle user registration
router.post("/register", async function (req, res) {
  const { email, username, password } = req.body;
  try {
    // Create a new user document with hashed password
    const userDoc = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user login
router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    // Compare the provided password with the hashed password in the database
    const passOk = bcrypt.compareSync(password, userDoc.password);
    const expiresIn = "1d";

    if (passOk) {
      // Create a JWT token and send it in a cookie along with user details
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

// Route to get user lists based on userId
router.get("/lists/:userId", async function (req, res) {
  const { userId } = req.params;
  // Fetch and return user details by userId
  res.json(await User.findById(userId));
});

// Route to add a media item to a user's watch list
router.put(
  "/users/:userId/lists/:watchList/:mediaType/:mediaId",
  async function (req, res) {
    try {
      const { userId, watchList, mediaType, mediaId } = req.params;
      const newMediaType = mediaType === "movie" ? "movies" : "tvShows";
      const user = await User.findById(userId);

      // Add the media id to the specified watch list
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

// Route to remove a media item from a user's watch list
router.delete(
  "/users/:userId/lists/:watchList/:mediaType/:mediaId",
  async function (req, res) {
    try {
      const { userId, watchList, mediaType, mediaId } = req.params;
      const newMediaType = mediaType === "movie" ? "movies" : "tvShows";

      // Remove the media id from the specified watch list
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
