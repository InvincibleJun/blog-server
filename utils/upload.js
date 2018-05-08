const multer = require('multer')

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function(req, file, cb) {
    cb(null, config.uploadDir)
  },
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage }).single('file')
