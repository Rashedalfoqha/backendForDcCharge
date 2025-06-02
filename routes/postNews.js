const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controller/postNews');

router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.get('/all', getAllPosts);
router.get('/:id', getPostById);
router.delete('/delete/:id', deletePost);

module.exports = router;
