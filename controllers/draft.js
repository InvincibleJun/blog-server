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
  let { title, body, _id } = req.body;
  if (_id) {
    await mdb.draft.update({ _id }, { $set: { title, body } });
  } else {
    await mdb.draft.create({ title, body });
  }
  return next({ data: { _id } });
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
  return next({ data });
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
  let desc = getArticleDesc(body);
  await mdb.article.create({ title, body, desc });
  next({ msg: "发表成功" });
}

// 过滤标签
const regHTMLTag = /<\/?[^>]*>/g;
// 过滤回车
const regBlank = /[\r\n]/g;

const regNbsp = /(&nbsp;)/g;

function getArticleDesc(html) {
  return html
    .replace(regHTMLTag, "")
    .replace(regBlank, "")
    .replace(regNbsp, "")
    .substr(0, 100);
}

async function upload(req, res, next) {
  let uploadTool = require("../utils/upload");
  await uploadTool(req, res, err => {
    next({ data: req.file });
  });
}

async function getOne(req, res, next) {
  const { _id } = req.query;
  let data = await mdb.draft.findById(_id);
  next({ data });
}

async function del(req, res, next) {
  const { _id } = req.query;
  await mdb.draft.findByIdAndRemove(_id);
  next({ msg: "删除成功" });
}

module.exports = {
  get,
  add,
  del,
  upload,
  getOne,
  publish
};
