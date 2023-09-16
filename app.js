import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";


// express set up
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// mongoose set up
// mongoose.connect('mongodb+srv://admin-ssk:e47W66@cluster0.lmjygxq.mongodb.net/DoToDB');

// const blogSchema = new mongoose.Schema({
//     header: {
//         type: String,
//         required: [true]
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     paragraph: {
//         type: String,
//         required: [true]
//     },
//     author: {
//         type: String,
//         required: [true]
//     }

// });
// const Blog = mongoose.model("Blog", blogSchema);


//Default items
const defaultBlog = {
    header: "Example Blog Post",
    date: new Date(), // Current date and time
    paragraph: "This is the content of the blog post. It can contain multiple paragraphs and text.",
    author: "John Doe",
};

const defaultBlog2 = {
    header: "Example Blog Post 2",
    date: new Date(), // Current date and time
    paragraph: "This is the content of the blog post. It can contain multiple paragraphs and text.",
    author: "John Doe",
};

app.get("/", function(req, res) {

        res.render("index");

  });



const defaultBlogs = [defaultBlog, defaultBlog2];


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });