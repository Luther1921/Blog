const Post = require("../models/Post");

// adding new blog
const addBlog = async (req, res) => {
  try {
    console.log(req.body);
    const { title, body } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!body) return res.status(400).json({ error: "Body is required" });

    const post = await Post.create(req.body);
    if (!post)
      return res
        .status(400)
        .json({ error: "Error occured while saving this post" });

    res.status(200).json({ data: post, message: "Post created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// getting all blog posts
const getBlog = async (req, res) => {
  try {
    const post = await Post.find();
    if (!post) return res.status(400).json({ error: "cannot get post" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// getting a post by id

const getBlogByID = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ error: `cannot find the product with the ID ${id}` });
    }
    res.status(200).json({ data: post, message: "gotten successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// to update the blog by id

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    if (!title) return res.status(400).json({ error: "title is required" });
    if (!body) return res.status(400).json({ error: "body is required" });

    const post = await Post.findByIdAndUpdate(id, req.body);
    if (!post)
      return res
        .status(404)
        .json({ error: `cannot find the section with the ID ${id}` });

    const updatedPost = await Post.findById(id);
    res.status(200).json({ updatedPost, message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// to detele a blog by id

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `cannot find the product with the ID ${id}` });
    }
    // const updatedPost = await Post.findById(id)
    res.status(200).json({ post, message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBlog,
  getBlog,
  getBlogByID,
  updateBlog,
  deleteBlog,
};
