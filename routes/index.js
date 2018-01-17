var express = require("express");
var multer = require("multer");
var request = require("request");

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
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
const upload = multer({ storage }).single("file");

var router = express.Router();

// var Articles = require("../models/articles");

router.post("/upload", function (req, res) {
  upload(req, res, err => {
    console.log(req.file);
    console.log(req.files);
  });
  res.send(200);
});

router.post("/api/article/add", function (req, res) {
  // Articles.created(req.body, function (err, data) {

  // })
  new Articles(req.body).save(function (err) {
    console.log(err);
  });
  console.log(req.body);
  res.send(200);
});

// test
// router.get("/api/article/add", function(req, res) {
//   // Articles.created(req.body, function (err, data) {
//   console.log(req.query);
//   // })
//   new Articles(req.body).save(function(err) {
//     console.log(err);
//   });
//   res.send(200);
// });

router.get("/api/article/get", function (req, res) {
  Articles.find({}, function (err, result) {
    res.json(result);
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
