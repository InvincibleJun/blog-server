var express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", upload.single("avatar"), function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.files);
  console.log(req.body);
  res.send(200);
});

router.options("/upload", function(req, res) {
  res.send(200);
});

module.exports = router;
