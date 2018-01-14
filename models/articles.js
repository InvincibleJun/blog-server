var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aritles = new Schema({
  title: {
    type: String,
    unique: true
  },
  body: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('aritles', aritles);
