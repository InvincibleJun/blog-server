var express = require("express");
var router = express.Router();
var upload = require('./fileuploads');

var Articles = require('../models/articles');

router.post("/upload", upload.single('file'), function (req, res) {
  console.log(req.file)
  res.json({ code: 0, sucessed: true, data: { link: `http://localhost:3000/uploads/${req.file.filename}` } })
});

router.post("/api/article/add", function (req, res) {
  // Articles.created(req.body, function (err, data) {

  // })
  new Articles(req.body).save(function (err) {
    console.log(err)
  })
  console.log(req.body)
  res.send(200)
})

router.get("/api/article/get", function (req, res) {
  Articles.find({}, function (err, result) {
    res.json(result)
  })
})

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
