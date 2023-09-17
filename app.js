import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";


// express set up
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// date
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

// mongoose set up
mongoose.connect('mongodb+srv://admin-ssk:e47W66@cluster0.lmjygxq.mongodb.net/BlogDB');

const blogSchema = new mongoose.Schema({
    header: {
        type: String,
        required: [true]
    },
    date: {
        type: String,
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
    date: formattedDate, // Current date and time
    paragraph: "This is the content of the blog post. It can contain multiple paragraphs and text.",
    author: "John Doe",
};

const defaultBlog2 = {
    header: "Example Blog Post 2",
    date: formattedDate, // Current date and time
    paragraph: "This is the content of the blog post. It can contain multiple paragraphs and text.",
    author: "John Doe",
};

const defaultBlogs = [defaultBlog, defaultBlog2];

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


  // POST
app.post("/", async function(req, res){
  
  const postHeader = req.body.inputHeader;
  const postParagraph = req.body.inputParagraph;
  const postAuthor = req.body.inputAuthor;

  console.log(postHeader + "..." + postParagraph + "..." + postAuthor);

  try {
    const post = new Blog({
      header: postHeader,
      date: formattedDate, 
      paragraph: postParagraph,
      author: postAuthor,
  });
  post.save();
  res.redirect("/");
    
  } catch (error) {
    console.log(error);
  }
});




//EDIT

app.post("/edit", async function(req, res){
  
  const postID = req.body.edit;
  const currentPost = await Blog.findById(postID);
  res.render("partials/edit", {editPost: currentPost});

});


// app.post("/",)





//DELETE
app.post("/delete", async function (req, res) {

  const postToDel = req.body.delete;
  try {
    await Blog.findByIdAndDelete(postToDel);
    res.redirect("/");
  } catch (error) {
    console.error(`Error deleting document: ${error}`);
  }
});





  app.get("/post", function (req, res) {
    res.render("partials/post");
  })

  app.get("/edit", function (req, res) {
    res.render("partials/edit");
  })

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });