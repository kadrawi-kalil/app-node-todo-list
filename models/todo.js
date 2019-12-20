const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Todo', todoSchema);
