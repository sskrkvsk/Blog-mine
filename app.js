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
mongoose.connect('mongodb+srv://admin-ssk:e47W66@cluster0.lmjygxq.mongodb.net/DoToDB');

const blogSchema = new mongoose.Schema({
    header: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        default: Date.now
    },
    paragraph: {
        type: String,
        required: [true]
    },
    author: {
        type: String,
        required: [true]
    }

});
const Blog = mongoose.model("Blog", blogSchema);


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

const defaultBlogs = [defaultBlog, defaultBlog2];

defaultBlog

app.get("/", function(req, res) {
    Blog.find({}).then(function(foundBlogs){

        if (foundBlogs.length < 1) {
          Blog.insertMany(defaultBlogs).then(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successefully saved default items to DB");
            }
          });
        } else {
          res.render("index", { newBlogs: foundBlogs });
        }
      })
      .catch(function(err){
        console.log(err);
      });

  });

  app.get("/post", function (req, res) {
    res.render("partials/post");
  })

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });