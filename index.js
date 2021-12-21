const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const router = require('express').Router()
const Todo_model = require('./models/todo')
const port = 2021;

const app = express();

const todoRoutes = require("./routes/Todo");


mongoose.Promise = global.Promise;



// Connect MongoDB at default port 27017.
mongoose.connect("mongodb://localhost:27017/todoapp",
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    });

app.use(cors());
app.use(bodyParser.json());
app.use(require("./routes/todo"))
app.use("/api", todoRoutes);

app.use("/", express.static(path.join(__dirname, "public")));
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
router.get('/add/todo', (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo_model({ todo, email_: req.user.email, done: "0" })
    if (todo == "") {
        res.redirect('/')
    }
    newTodo.save()
        .then(() => {
            console.log("done")
            res.redirect('/')
        })
        .catch(err => console.log(err))
})
    .get("/delete/todo/:_id", (req, res) => {
        const { _id } = req.params;
        Todo_model.deleteOne({ _id })
            .then(() => {
                console.log("deleted")
                res.redirect('/')
            })
            .catch((err) => console.log(err));
    })
    .get("/update/todo/:_id", (req, res) => {
        const { _id } = req.params;
        const info = Todo_model.find();
        console.log(info)
        Todo_model.updateOne({ _id }, { done: "1" })
            .then(() => {
                console.log("deleted")
                res.redirect('/')
            })
            .catch((err) => console.log(err));
    });

module.exports = router;