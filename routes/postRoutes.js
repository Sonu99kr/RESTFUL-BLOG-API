const express = require("express")
const {createPost, getAllPosts, getPostById, updatePost, deletePost} = require("../controllers/postControllers");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;