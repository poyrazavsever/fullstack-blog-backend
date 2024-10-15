// controllers/categoryController.js

const Category = require('../models/category.model');
const APIError = require('../utils/errors');
const Response = require('../utils/response');

// Kategori oluşturma
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new APIError('Category name is required', 400);
    }

    // Yeni kategori oluştur
    const category = new Category({ name });
    await category.save();

    // Başarılı yanıt
    return new Response(category, 'Category created successfully').created(res);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key hatası
      return new APIError('Category already exists', 400).error400(res);
    }
    next(err);
  }
};

// Tüm kategorileri getirme
const getAllCategories = async (req, res, next) => {
  try {
    // Tüm kategorileri bul
    const categories = await Category.find().sort({ name: 1 });

    // Başarılı yanıt
    return new Response(categories, 'All categories fetched successfully').success(res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
