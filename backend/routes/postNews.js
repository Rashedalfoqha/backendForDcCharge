const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controller/postNews');

router.post('/create', upload.single('image'), createPost);
router.put('/update/:id', upload.single('image'), updatePost);
router.get('/all', getAllPosts);
router.get('/:id', getPostById);
router.delete('/delete/:id', deletePost);

module.exports = router;
