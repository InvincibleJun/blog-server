const multer = require('multer');

/**
 * 添加文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function createArticle(req, res, next) {
  const {
    title, body, _id, tags
  } = req.body;

  const match = body.match(/#{1,6}\s+导语\n([^#]+)\n/);
  const desc = match && match[1] ? match[1] : '';

  await mdb.article.create({
    title,
    body,
    tags,
    desc
  });

  return next({ data: { _id } });
}

/**
 * 更新文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function updateArticle(req, res, next) {
  const {
    title, body, _id, tags
  } = req.body;

  const match = body.match(/#{1,6}\s+导语\n([^#]+)\n/);
  const desc = match && match[1] ? match[1] : '';

  await mdb.article.updateOne(
    { _id },
    {
      title,
      body,
      tags,
      desc,
      updateTime: Date.now()
    }
  );

  return next({ data: { _id } });
}

/**
 * 获得文章列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getArticleList(req, res, next) {
  const {
    page = 1, size = 12, type, tag
  } = req.query;

  const limit = parseInt(page, 10) * size;
  const skip = (page - 1) * size;

  let query = {};
  if (tag && typeof tag === 'string') {
    // query
  }

  if (type === 'draft') {
    query = {
      ...query,
      isPublished: false,
      isDelete: false
    };
  } else if (type === 'all') {
    query = {
      ...query,
      isDelete: false
    };
  } else if (type === 'article') {
    query = {
      ...query,
      isPublished: true,
      isDelete: false
    };
  } else if (type === 'delete') {
    query = {
      ...query,
      isDelete: false
    };
  }

  const data = await mdb.article
    .find(query, ['title', 'createTime', 'desc'])
    .sort({ updateTime: -1 })
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
async function publishArticle(req, res, next) {
  const { _id, _status } = req.params;

  await mdb.article.updateOne(
    { _id },
    {
      $set: {
        isPublished: !!_status,
        updateTime: Date.now()
      }
    }
  );

  return next({ msg: '发表成功' });
}

async function uploadImage(req, res, next) {
  const storage = multer.diskStorage({
    // 设置上传上传路径
    destination(request, file, cb) {
      cb(null, config.imageDir);
    },
    // 给上传文件重命名
    filename(request, file, cb) {
      cb(null, file.originalname);
    }
  });

  await multer({ storage }).single('file')(req, res, (err) => {
    if (err) {
      next({ msg: err.toString() });
    } else {
      next({ data: `/static/image/${req.file.filename}` });
    }
  });
}

/**
 * 获得文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getArticle(req, res, next) {
  const { _id } = req.params;

  const data = await mdb.article.findById(_id);

  next({ data });
}

async function cancelPulish(req, res, next) {
  const { _id } = req.query;

  await mdb.article.updateOne({ _id }, { $set: { isPublished: false } });

  next({ msg: '取消发布成功' });
}

/**
 * 删除文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteArticle(req, res, next) {
  const { _id } = req.params;

  await mdb.article.updateOne(
    { _id },
    {
      $set: {
        isPublished: false,
        isDelete: true
      }
    }
  );

  next({ msg: '删除成功' });
}

module.exports = {
  createArticle,
  cancelPulish,
  getArticle,
  getArticleList,
  updateArticle,
  publishArticle,
  uploadImage,
  deleteArticle
};
