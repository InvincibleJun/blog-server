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
  let { page, size } = req.query;
  let limit = parseInt(page) * size;
  let skip = (page - 1) * size;
  let data = await mdb.draft
    .find({}, ["title", "createTime"])
    .limit(limit)
    .skip(skip);
  res.send(data);
}

/**
 * 发表草稿
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function publish(req, res, next) {
  let { _id } = req.query;
  let { title, body } = await mdb.draft.findById(_id);
  await mdb.article.create({ title, body });
  next({ msg: "发表成功" });
}

async function upload(req, res) {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "../public/uploads");
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

// 过滤标签
const regHTMLTag = /<\/?[^>]*>/g;
// 过滤回车
const regBlank = /[\r\n]/g;

async function getOne(req, res, next) {
  const { id } = req.query.id;
  let data = await mdb.draft.findById(id);
  res.send(data);
}

module.exports = {
  get,
  add,
  upload,
  getOne,
  publish
};
