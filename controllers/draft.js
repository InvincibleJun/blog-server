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
  let limit = parseInt(page);
  let skip = (page - 1) * size;
  req.check({
    id: {
      in: "query",
      errorMessage: "page is not exist",
      isInt: true
    }
  });
  let result = await req.getValidationResult();
  if (!result.isEmpty()) {
    Promise.reject("error");
  }
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
async function post(req, res, next) {
  let { _id } = req.query;
  let data = await mdb.draft.find({}, ["title", "createTime"]);
  console.log(data);
  res.send(data);
}

function getOne(params) {
  res.send(200);
}

async function upload(req, res) {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../public/uploads");
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
