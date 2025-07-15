const Post = require("../models/postSchema");

async function createPost(req, res) {
  const { title, content } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: "Error creating post!" });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function getPostById(req, res) {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", "name email");
    if (!post) return res.status(404).json({ error: "Post not available!" });

    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    if (post.author.toString() !== req.user.id)
      return res
        .status(403)
        .json({ error: "Not authorized to update this post" });

    post.title = title;
    post.content = content;
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== userId)
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete post" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
