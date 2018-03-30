const { addAnchorAndMenu, getDesc } = require("../utils/article");

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
  let { title, body, _id, tags } = req.body;
  if (_id) {
    await mdb.draft.update({ _id }, { $set: { title, body, tags } });
  } else {
    await mdb.draft.create({ title, body, tags });
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
    .find({ isPublished: false }, ["title", "createTime"])
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
  let { title, body, tags } = await mdb.draft.findById(_id);

  // 导语处理
  let desc = getDesc(body);
  if (!desc) return next({ msg: "导语不存在" });

  // 锚点处理
  let { md, anchors } = addAnchorAndMenu(body)

  await mdb.article.create({ title, body: md, desc, anchors, draftID: _id, tags  });

  await mdb.draft.update({ _id }, { $set: { isPublished: true } });
  return next({ msg: "发表成功" });
}

// // 过滤标签
// const regHTMLTag = /<\/?[^>]*>/g;
// // 过滤回车
// const regBlank = /[\r\n]/g;

// const regNbsp = /(&nbsp;)/g;

// function getArticleDesc(html) {
//   return html
//     .replace(regHTMLTag, "")
//     .replace(regBlank, "")
//     .replace(regNbsp, "")
//     .substr(0, 100);
// }

async function upload(req, res, next) {
  let uploadTool = require("../utils/upload");
  await uploadTool(req, res, err => {
    next({ data: '/static/image/' + req.file.filename });
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
