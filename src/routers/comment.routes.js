const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPost } = require('../controller/comment.controller');
const errorHandlerMiddleware = require('../middlewares/errorHandler');

// POST isteği: Yorum oluştur
router.post('/comments', createComment);

// POST isteği: Bir posta ait yorumları getir
router.post('/comments/byPost', getCommentsByPost);

// Error handler middleware
router.use(errorHandlerMiddleware);

module.exports = router;
