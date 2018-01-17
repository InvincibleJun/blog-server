async function add(req, res) {
  let { title, body } = req.body;
  await mdb.draft.create({ title, body });
  res.send(200);
}

async function get(req, res) {
  let data = await mdb.draft.find({});
  console.log(data);
  res.send(data);
}

async function upload(req, res) {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./public/uploads");
    },
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
  multer({ storage }).single("file")(req, res, function(err) {
    res.send({ data: req.file });
  });
}

module.exports = {
  get,
  add,
  upload
};
