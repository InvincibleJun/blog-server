/********************************
 * desc: 草稿相关控制器
*********************************/
/**
 * 添加草稿
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function add(req, res, next) {
  let { title, body } = req.body;
  await mdb.draft.create({ title, body });
  res.send(200);
}

/**
 * 获得草稿列表
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function get(req, res, next) {
  let { page, size } = req.query
  let limit = parseInt(page)
  let skip = (page - 1) * size
  let data = await mdb.draft.find({}, ['title', 'createTime']).limit(limit).skip(skip);
  res.send(data);
}

<<<<<<< HEAD
// async function post(params) {

// }

async function upload(req, res) {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "../public/uploads");
=======
/**
 * 获得单一草稿内容
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getOne(req, res, next) {
  let { _id } = req.query
  let data = await mdb.draft.findById(_id)
  res.send(data)
}

/**
 * 上传图片
 * @param {*} req 
 * @param {*} res 
 */
async function upload(req, res) {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
>>>>>>> 3bc0f5212b3a28f2c326d427477e41f3fc15f815
    },
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
  multer({ storage }).single("file")(req, res, function (err) {
    res.send({ data: req.file });
  });
}

module.exports = {
  get,
  add,
  upload,
  getOne
};
