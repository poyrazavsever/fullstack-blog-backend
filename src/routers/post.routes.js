// postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost, updatePost, findByIdPost, lastPost } = require('../controller/post.controller');
const errorHandlerMiddleware = require('../middlewares/errorHandler'); // Hata yöneticisi

// POST isteği: Yeni post oluştur
router.post('/crate-post', createPost);

// POST isteği: Post güncelle
router.post('/posts/update-post', updatePost);

// POST isteği: ID ile post bul
router.post('/posts/findById-post', findByIdPost);

// POST isteği: Son eklenen postları getir
router.post('/posts/latest-post', lastPost);

router.use(errorHandlerMiddleware);

module.exports = router;
