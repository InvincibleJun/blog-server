/**
 * 创建tag
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function createTag(req, res, next) {
  const { name } = req.body;

  await mdb.tag.create({ name });

  next({ msg: '创建成功' });
}

/**
 * 获得tag列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getTagList(req, res, next) {
  const data = await mdb.tag.find({ isDelete: false }, ['name']);

  next({ data });
}

/**
 * 删除tag
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteTag(req, res, next) {
  const { _id } = req.params;

  await mdb.tag.updateOne({ _id }, { $set: { isDelete: false } });

  next({ msg: '删除成功' });
}

module.exports = {
  createTag,
  getTagList,
  deleteTag
};
