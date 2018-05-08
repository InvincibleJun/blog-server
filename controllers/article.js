const { addAnchorAndMenu } = require('../utils/article')

/**
 * get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function get(req, res, next) {
  let data = await mdb.article.find({})
  next({ data })
}

async function getOne(req, res, next) {
  const { _id } = req.query
  let data = await mdb.article.findById(_id, [
    'title',
    'body',
    'anchors',
    'createTime'
  ])
  next({ data })
}

async function getList(req, res, next) {
  // const {}
  let data = await mdb.article.find({}, ['title', 'createTime', 'draftID'])
  next({ data })
}

async function getNewList(req, res, next) {
  let data = await mdb.article.find({}, ['title', 'createTime'])
  next({ data })
}

async function del(req, res, next) {
  const { _id, draftID } = req.body
  await mdb.draft.update({ _id: draftID }, { $set: { isPublished: false } })
  await mdb.article.remove({ _id })
  next({ msg: '删除成功' })
}

module.exports = {
  get,
  getOne,
  getList,
  getNewList,
  del
}
