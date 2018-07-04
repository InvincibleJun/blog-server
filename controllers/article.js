// const { addAnchorAndMenu } = require('../utils/article');

/**
 * get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function get(req, res, next) {
  const data = await mdb.article.find({}, ['title', 'createTime', 'desc'], {
    sort: {
      createTime: -1
    }
  });
  next({ data });
}

async function getOne(req, res, next) {
  const { _id } = req.query;
  const data = await mdb.article.findById(_id, ['tags', 'title', 'body', 'anchors', 'createTime']);
  next({ data });
}

async function getList(req, res, next) {
  const { tag, type } = req.query;
  const tagCondition = tag !== 'all' ? { tags: { $all: tag } } : {};
  let typeCondition = {};
  if (type === 2) {
    typeCondition = { isPublished: false, isDelete: false };
  } else if (type === 3) {
    typeCondition = { isPublished: true, isDelete: false };
  } else if (type === 4) {
    typeCondition = { isDelete: true };
  }
  console.log(tagCondition);
  console.log(tagCondition, typeCondition);
  const data = await mdb.article.find({ ...tagCondition, ...typeCondition }, [
    'title',
    'createTime',
    'updateTime'
  ]);
  next({ data });
}

async function getNewList(req, res, next) {
  const data = await mdb.article.find({}, ['title', 'createTime']);
  next({ data });
}

async function del(req, res, next) {
  const { _id, draftID } = req.body;
  await mdb.draft.update({ _id: draftID }, { $set: { isPublished: false } });
  await mdb.article.remove({ _id });
  next({ msg: '删除成功' });
}

async function addArticle(req, res, next) {
  const { title, body, tags } = req.body;
  const { _id } = req.body;
  const updateTime = Date.now();
  if (_id) {
    await mdb.article.update(
      { _id },
      {
        $set: {
          title,
          body,
          tags,
          updateTime
        }
      }
    );
    return next({ data: { _id } });
  }
  const data = await mdb.article.create({
    title,
    body,
    tags,
    updateTime
  });
  return next({ data });
}

module.exports = {
  get,
  getOne,
  getList,
  getNewList,
  del,
  addArticle
};
