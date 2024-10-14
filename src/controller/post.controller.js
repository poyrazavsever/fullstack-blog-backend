// postController.js

const Post = require('../models/post.model');
const Category = require('../models/category.model');
const APIError = require('../utils/errors');
const Response = require('../utils/response');

const createPost = async (req, res, next) => {
  try {
    const { bannerImage, title, content, reason, source, categories } = req.body;

    if (categories) {
      const categoryCheck = await Category.find({ _id: { $in: categories } });
      if (categoryCheck.length !== categories.length) {
        throw new APIError('Some categories do not exist', 400);
      }
    }

    
    const newPost = new Post({
      bannerImage,
      title,
      content,
      reason,
      source,
      categories
    });

    
    const savedPost = await newPost.save();

    
    return new Response(savedPost, 'Post created successfully').created(res);
  } catch (err) {
    
    next(err);
  }
};

module.exports = {
  createPost
};
