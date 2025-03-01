const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    type: [String],  
    required: true,  
    default: []      
  },  
  readArticles: [{ type: String }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
