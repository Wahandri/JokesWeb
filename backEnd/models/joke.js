const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let jokeSchema = new Schema({
    text: {
        type: String,
        required: [true, "Text of joke is required"],
        unique: true
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, 
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    score: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("Joke", jokeSchema);
