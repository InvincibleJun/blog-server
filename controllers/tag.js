/**
 * 创建tag
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function createTag(req, res, next) {
  const { name } = req.body;
  const random = Math.floor(Math.random() * config.colors.length);
  const color = config.colors[random];
  await mdb.tag.create({ name, color });

  next({ msg: '创建成功' });
}

/**
 * 获得tag列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getTagList(req, res, next) {
  const data = await mdb.tag.find({ isDelete: false }, ['name', 'color']);

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
