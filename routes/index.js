var express = require("express");
var multer = require("multer");

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        fileFormat[fileFormat.length - 1]
    );
  }
});
const upload = multer({ storage }).single("image");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", function(req, res) {
  upload(req, res, err => {
    console.log(req.file);
    console.log(req.files);
  });
  res.send(200);
});

router.options("/upload", function(req, res) {
  res.send(200);
});

module.exports = router;
