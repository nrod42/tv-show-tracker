const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    watching: {
      movies: [{ type: String }],
      tvShows: [{ type: String }]
    },
    completed: {
      movies: [{ type: String }],
      tvShows: [{ type: String }]
    },
    wantToWatch: {
      movies: [{ type: String }],
      tvShows: [{ type: String }]
    },
    dropped: {
      movies: [{ type: String }],
      tvShows: [{ type: String }]
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;

//we need to split each array into two arrays, one for tv show ids and the other for movie ids.
//Then, in lists, we can just get the length of each to display
// And in each list page, we can make another useEffect to get the lists,
// once we have them, get the data for all ids and display it.
// We can even have another nav for  folter based on tv or movie OR we can just display them all in two sections!
