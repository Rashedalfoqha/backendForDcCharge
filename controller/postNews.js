const postModel = require('../models/postNewsSchema');

const createPost = async (req, res) => {
  try {
    const { language, title, body, publishedDate, status, category, imageUrl } = req.body;

    const newPost = new postModel({
      language,
      title,
      body,
      publishedDate,
      status,
      category,
      imageUrl: imageUrl || null,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Error creating post', error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const [items, total, latestItem] = await Promise.all([
      postModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title imageUrl category publishedDate createdAt')
        .lean(),
      postModel.estimatedDocumentCount(),
      postModel.findOne().sort({ updatedAt: -1 }).select('updatedAt').lean(),
    ]);

    const hasMore = skip + items.length < total;

    const lastModified = latestItem?.updatedAt || new Date();
    const ifModifiedSince = req.headers['if-modified-since'];
    if (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified)) {
      return res.status(304).end();
    }
    res.setHeader('Last-Modified', new Date(lastModified).toUTCString());
    res.status(200).json({
      items,
      page,
      limit,
      total,
      hasMore,
    });
  } catch (error) {
    console.error('Fetch All Posts Error:', error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id).lean();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const etag = 'W/"' + (post.updatedAt?.getTime?.() || 0) + '-' + (post._id?.toString?.() || '') + '"';
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch && ifNoneMatch === etag) {
      return res.status(304).end();
    }
    res.setHeader('ETag', etag);
    res.status(200).json(post);
  } catch (error) {
    console.error('Fetch Post By ID Error:', error);
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { language, title, body, publishedDate, status, category, imageUrl } = req.body;

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        language,
        title,
        body,
        publishedDate,
        status,
        category,
        imageUrl: imageUrl || null,
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
  deletePost,
};
