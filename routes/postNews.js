const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controller/postNews');
const auth = require('../middleware/authentication');

router.post('/create', auth, createPost);
router.put('/update/:id', auth, updatePost);
router.get('/all', getAllPosts);
router.get('/:id', getPostById);
router.delete('/delete/:id', auth, deletePost);

module.exports = router;
