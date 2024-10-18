// postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost, updatePost, findByIdPost, lastPost, getAllPosts } = require('../controller/post.controller');
const errorHandlerMiddleware = require('../middlewares/errorHandler'); // Hata yöneticisi
const upload = require('../middlewares/multer'); // Multer middleware'ini import ettik

// POST isteği: Yeni post oluştur
router.post('/create-post', upload.single('bannerImage'), createPost); // bannerImage alanı için multer kullan

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
