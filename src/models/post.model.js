const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  bannerImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories", // Refers to the Category model
    },
  ],
  reason: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Refers to the 'users' collection
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Post oluşturulduğunda otomatik olarak tarih atanacak
  },
});

const Posts = mongoose.model("posts", PostSchema);

module.exports = Posts;
