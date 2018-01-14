var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  age: Number,
  address: String,
  createAt: {
    type: Date,
    default: Date.now()
  }
});

const model = mongoose.model('users', userSchema);
// 将数据模型暴露出去
module.exports = model

model.create({ age: 1 }, function (err, data) {
  // 重定向到所用用户列表
})
