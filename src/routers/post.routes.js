// postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost } = require('../controller/post.controller');
const errorHandlerMiddleware = require('../middlewares/errorHandler'); // Hata yöneticisi

router.post('/create-post', createPost);

router.use(errorHandlerMiddleware);

module.exports = router;
