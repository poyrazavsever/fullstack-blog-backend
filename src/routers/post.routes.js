// postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost, updatePost, findByIdPost, lastPost, getAllPosts } = require('../controller/post.controller');
const errorHandlerMiddleware = require('../middlewares/errorHandler'); // Hata yöneticisi

// POST isteği: Yeni post oluştur
router.post('/create-post', createPost);

// POST isteği: Post güncelle
router.post('/posts/update', updatePost);

// POST isteği: ID ile post bul
router.post('/posts/findById', findByIdPost);

// POST isteği: Son eklenen postları getir
router.get('/posts/latest', lastPost);

// POST isteği: Tüm postları getir
router.get('/posts/all', getAllPosts);

router.use(errorHandlerMiddleware);

module.exports = router;
