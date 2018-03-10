const { addAnchorAndMenu } = require("../utils/article");

/**
 * get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function get(req, res, next) {
  let data = await mdb.article.find({});
  next({ data });
}

async function getOne(req, res, next) {
  const { _id } = req.query;
  let data = await mdb.article.findById(_id, ["title", "body"]);
  let { body, anchors } = addAnchorAndMenu(data.body);
  next({ data: { body, anchors, title: data.title } });
}

async function getList(req, res, next) {
  // const {}
  let data = await mdb.article.find({}, ["title"]);
  next({ data });
}

async function getNewList(req, res, next) {
  let data = await mdb.article.find({}, ["title", "createTime"]);
  next({ data });
}

module.exports = {
  get,
  getOne,
  getList,
  getNewList
};
