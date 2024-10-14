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

const updatePost = async (req, res, next) => {
  try {
    const { id, bannerImage, title, content, reason, source, categories } = req.body;

    // Postu bul ve güncelle
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { bannerImage, title, content, reason, source, categories },
      { new: true, runValidators: true }
    );

    // Eğer post bulunamazsa hata döndür
    if (!updatedPost) {
      throw new APIError('Post not found', 404);
    }

    // Başarılı yanıt
    return new Response(updatedPost, 'Post updated successfully').success(res);
  } catch (err) {
    next(err);
  }
};

const findByIdPost = async (req, res, next) => {
  try {
    const { id } = req.body; // ID'yi gövdeden alıyoruz

    if (!id) {
      throw new APIError('Post ID is required', 400);
    }

    // Postu ID ile bul
    const post = await Post.findById(id).populate('categories', 'name');

    if (!post) {
      throw new APIError('Post not found', 404);
    }

    // Başarılı yanıt
    return new Response(post, 'Post fetched successfully').success(res);
  } catch (err) {
    next(err);
  }
};

const lastPost = async (req, res, next) => {
  try {
    // En son eklenen postu getir
    const posts = await Post.find().sort({ createdAt: -1 }).limit(1).populate('categories', 'name');

    // Başarılı yanıt
    return new Response(posts, 'Latest posts fetched successfully').success(res);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createPost,
  updatePost,
  findByIdPost,
  lastPost,
};
