const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const validRoles = {
  values: ["ADMIN", "USER"],
  message: "{VALUE} is not a valid role"
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    default: "USER",
    enum: validRoles
  },
  active: {
    type: Boolean,
    default: true
  },
  favoriteJokes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Joke' }
  ]
});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.role;
  delete userObject.__v;
  delete userObject.active;

  return userObject;
}

module.exports = mongoose.model("User", userSchema);
