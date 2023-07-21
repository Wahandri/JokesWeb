const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let jokeSchema = new Schema({
    title: {
        type: String,
        default: "Sin titulo"
    },
    text: {
        type: String,
        required: [true, "Text of joke is required"],
        unique: true
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    funny: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("Joke", jokeSchema);