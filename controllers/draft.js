const { addAnchorAndMenu, getDesc } = require('../utils/article');
const uploadTool = require('../utils/upload');

/** ******************************
 * desc: 草稿相关控制器
 ******************************** */
/**
 * 添加草稿
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function add(req, res, next) {
  const {
    title, body, _id, tags
  } = req.body;
  if (_id) {
    await mdb.article.update(
      { _id },
      {
        $set: {
          title,
          body,
          tags,
          updateTime: Date.now()
        }
      }
    );
  } else {
    await mdb.article.create({ title, body, tags });
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
  const { page, size } = req.query;
  const limit = parseInt(page, 10) * size;
  const skip = (page - 1) * size;
  const data = await mdb.article
    .find({ isPublished: false }, ['title', 'createTime'])
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
  const { _id } = req.query;
  const { title, body, tags } = await mdb.article.findById(_id);

  // 导语处理
  const desc = getDesc(body);
  if (!desc) return next({ msg: '导语不存在' });

  // 锚点处理
  const { md, anchors } = addAnchorAndMenu(body);

  await mdb.article.update(
    { _id },
    {
      $set: {
        title,
        body: md,
        desc,
        isPublished: true,
        updateTime: Date.now(),
        anchors,
        tags
      }
    }
  );

  return next({ msg: '发表成功' });
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
  await uploadTool(req, res, (err) => {
    if (err) {
      next({ msg: err.toString() });
    } else {
      next({ data: `/static/image/${req.file.filename}` });
    }
  });
}

async function getOne(req, res, next) {
  const { _id } = req.query;
  const data = await mdb.article.findById(_id);
  next({ data });
}

async function del(req, res, next) {
  const { _id } = req.query;
  await mdb.article.update({ _id }, { $set: { isPublished: false } });
  next({ msg: '删除成功' });
}

module.exports = {
  get,
  add,
  del,
  upload,
  getOne,
  publish
};
