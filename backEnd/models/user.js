const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role"
}
// Esquema para crear "USER"
    let userSchema = new Schema({
        username: {
            type: String,
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
        }
    });
// --------------

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