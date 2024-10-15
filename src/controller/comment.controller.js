const Comment = require('../models/comments.model');
const APIError = require('../utils/errors');
const Response = require('../utils/response');

// Yorum oluşturma
const createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;

    if (!content || !userId || !postId) {
      throw new APIError('Content, userId, and postId are required', 400);
    }

    // Yeni yorum oluştur
    const comment = new Comment({
      content,
      user: userId,
      post: postId,
    });
    await comment.save();

    // Başarılı yanıt
    return new Response(comment, 'Comment created successfully').created(res);
  } catch (err) {
    next(err);
  }
};

// Belirli bir posttaki yorumları getirme
const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      throw new APIError('Post ID is required', 400);
    }

    // Posta ait yorumları bul
    const comments = await Comment.find({ post: postId }).populate('user', 'name lastname').sort({ createdAt: -1 });

    // Başarılı yanıt
    return new Response(comments, 'Comments fetched successfully').success(res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};
