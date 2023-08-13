const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    watching: {
      movies: [{ type: String }],
      tvShows: [{ type: String }],
    },
    completed: {
      movies: [{ type: String }],
      tvShows: [{ type: String }],
    },
    planning: {
      movies: [{ type: String }],
      tvShows: [{ type: String }],
    },
    dropped: {
      movies: [{ type: String }],
      tvShows: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
