const mongoose = require('mongoose');

// Comment schema
const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  }
});

const Comments = mongoose.model('comments', CommentSchema);

module.exports = Comments;
