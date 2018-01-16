var express = require("express");
var multer = require("multer");
var request = require("request");

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
const upload = multer({ storage }).single("file");

var router = express.Router();

var Articles = require("../models/articles");

router.post("/upload", function(req, res) {
  upload(req, res, err => {
    console.log(req.file);
    console.log(req.files);
  });
  res.send(200);
});

router.post("/api/article/add", function(req, res) {
  // Articles.created(req.body, function (err, data) {

  // })
  new Articles(req.body).save(function(err) {
    console.log(err);
  });
  console.log(req.body);
  res.send(200);
});

router.get("/api/article/add", function(req, res) {
  // Articles.created(req.body, function (err, data) {
  console.log(req.query);
  // })
  new Articles(req.body).save(function(err) {
    console.log(err);
  });
  res.send(200);
});

router.get("/api/article/get", function(req, res) {
  Articles.find({}, function(err, result) {
    res.json(result);
  });
});

router.get("/login/github", function(req, res) {
  let code = req.query.code;
  request(
    `https://github.com/login/oauth/access_token?code=${code}&client_id=79c7c7124c99c2c89d7c&client_secret=f34de051bdad672f3e323adebbc71e12df6ec029`,
    (err, response, body) => {
      let str = response.body;
      let result = str.match(/access_token=(\w+)/i);
      if (result && result[1]) {
        request(
          {
            url: `https://api.github.com/user?access_token=${result[1]}`,
            headers: {
              "User-Agent": "blog"
            }
          },
          (err, response, body) => {
            res.send(body);
          }
        );
      }
    }
  );
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
