const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");

//@route    GET api/posts
//@desc     Get all users posts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name").sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/posts/:id
//@desc     Get single post
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name");
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/posts
//@desc     Add new post
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("text", "Please add Text").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text } = req.body;

    try {
      const newPost = new Post({
        title,
        text,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/posts:id
//@desc     Update post
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const { title, text } = req.body;

  //Build post object
  const updatedPost = {};
  if (title) updatedPost.title = title;
  if (text) updatedPost.text = text;
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    //Make sure user owns post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPost },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/posts:id
//@desc     Delete post
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    //Make sure user owns post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Post.findByIdAndRemove(req.params.id);

    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
