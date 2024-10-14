const mongoose = require('mongoose');

// Category schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
});

const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;
