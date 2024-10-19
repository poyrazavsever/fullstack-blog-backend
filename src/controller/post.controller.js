// postController.js

const Post = require("../models/post.model");
const Category = require("../models/category.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const createPost = async (req, res, next) => {
  try {
    // Multer ile yüklenen dosya bilgisi
    const bannerImage = req.file ? req.file.path : ""; // Yüklenen resmin yolu

    const { title, content, reason, source, categories } = req.body;

    if (Array.isArray(categories)) {
      const categoryCheck = await Category.find({ _id: { $in: categories } });
      if (categoryCheck.length !== categories.length) {
        throw new APIError("Some categories do not exist", 400);
      }
    } else {
      throw new APIError("Categories must be an array", 400);
    }

    const newPost = new Post({
      bannerImage,
      title,
      content,
      reason,
      source,
      categories,
    });

    const savedPost = await newPost.save();
    return new Response(savedPost, "Post created successfully").created(res);
  } catch (err) {
    console.error("Error in createPost:", err); // Hata mesajını logla
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id, bannerImage, title, content, reason, source, categories } =
      req.body;

    // Postu bul ve güncelle
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { bannerImage, title, content, reason, source, categories },
      { new: true, runValidators: true }
    );

    // Eğer post bulunamazsa hata döndür
    if (!updatedPost) {
      throw new APIError("Post not found", 404);
    }

    // Başarılı yanıt
    return new Response(updatedPost, "Post updated successfully").success(res);
  } catch (err) {
    next(err);
  }
};

const findByIdPost = async (req, res, next) => {
  try {
    const { id } = req.body; // ID'yi gövdeden alıyoruz

    if (!id) {
      throw new APIError("Post ID is required", 400);
    }

    // Postu ID ile bul
    const post = await Post.findById(id).populate("categories", "name");

    if (!post) {
      throw new APIError("Post not found", 404);
    }

    // Başarılı yanıt
    return new Response(post, "Post fetched successfully").success(res);
  } catch (err) {
    next(err);
  }
};

const lastPost = async (req, res, next) => {
  try {
    // En son eklenen postu getir
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .populate("categories", "name");

    // Başarılı yanıt
    return new Response(posts, "Latest posts fetched successfully").success(
      res
    );
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    // Tüm postları getir
    const posts = await Post.find().populate("categories", "name");

    // Başarılı yanıt
    return new Response(posts, "All posts fetched successfully").success(res);
  } catch (err) {
    next(err);
  }
};

const toggleLikePost = async (req, res, next) => {
  try {
    const { userId, postId } = req.body; // userId ve postId'yi gövdeden alıyoruz

    if (!userId || !postId) {
      throw new APIError("User ID and Post ID are required", 400);
    }

    // Postu bul
    const post = await Post.findById(postId);
    if (!post) {
      throw new APIError("Post not found", 404);
    }

    // Eğer kullanıcı daha önce beğenmişse, beğenme işlemini kaldır
    if (post.likes.includes(userId)) {
      post.likes.pull(userId); // Kullanıcıyı beğenilerden kaldır
    } else {
      post.likes.push(userId); // Kullanıcıyı beğenilere ekle
    }

    await post.save(); // Güncellemeyi kaydet
    return new Response(post.likes, "Like toggled successfully").success(res);
  } catch (err) {
    console.error("Error in toggleLikePost:", err);
    next(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  findByIdPost,
  lastPost,
  getAllPosts,
  toggleLikePost,
};
