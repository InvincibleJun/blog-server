async function add(req, res, next) {
  let { name } = req.body
  await mdb.tag.create({ name });
  next({ msg: '创建成功' })
}

async function getList(req, res, next) {
  let data = await mdb.tag.find({}, ['name'])
  next({ data })
}

module.exports = {
  add,
  getList
}