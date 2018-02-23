/**
 * get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function get(req, res, next) {
  let data = await mdb.article.find({}, ['body', 'title', 'desc'])
  next({ data })
}

module.exports = {
  get
}