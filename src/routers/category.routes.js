// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories } = require('../controller/category.contoller');
const errorHandlerMiddleware = require('../middlewares/errorHandler');

// POST isteği: Yeni kategori oluştur
router.post('/categories', createCategory);

// POST isteği: Tüm kategorileri getir
router.post('/categories/all', getAllCategories);

// Error handler middleware
router.use(errorHandlerMiddleware);

module.exports = router;
