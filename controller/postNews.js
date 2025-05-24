const postModel = require('../models/postNewsSchema');
const path = require('path');

// @desc Create new post
const createPost = async (req, res) => {
  try {
    const { language, title, body, publishedDate, status, category } = req.body;

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newPost = new postModel({
      language,
      title,
      body,
      publishedDate,
      status,
      category,
      imageUrl
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// @desc Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Fetch All Posts Error:', error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// @desc Get post by ID
const getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Fetch Post By ID Error:', error);
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// @desc Update post
const updatePost = async (req, res) => {
  try {
    const { language, title, body, publishedDate, status, category } = req.body;

    let imageUrl = req.body.imageUrl || null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        language,
        title,
        body,
        publishedDate,
        status,
        category,
        imageUrl
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Update Post Error:', error);
    res.status(500).json({ message: 'Error updating post', error });
  }
};

// @desc Delete post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await postModel.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete Post Error:', error);
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
