const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    password: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    // slack login - optional
    slackID: { 
      type: String
    },
    // google login - optional
    googleID: { 
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
