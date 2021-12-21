const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Todo = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model("Todo", Todo);
const mongoose = require('mongoose');
const Todoschema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    email_: {
        type: String,
        required: true,
    },
    done: {
        type: String,
        required: true,
    }

});

module.exports = new mongoose.model("Todo", Todoschema);