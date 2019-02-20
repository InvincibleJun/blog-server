const multer = require('multer');

/**
 * 添加文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function createArticle(req, res, next) {
  const { title, body, tags } = req.body;

  const match = body.match(/#{1,6}\s+导语\n([^#]+)\n/);
  const desc = match && match[1] ? match[1] : '';

  const { _id } = await mdb.article.create({
    title,
    body,
    tags,
    desc
  });

  const article = await mdb.article
    .findById(_id)
    .populate({ path: 'tags', select: ['color', 'name'] });

  return next({ data: article });
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
  const date = Date.now();

  await mdb.article.updateOne(
    { _id },
    {
      title,
      body,
      tags,
      desc,
      updateTime: date
    }
  );

  const article = await mdb.article
    .findById(_id)
    .populate({ path: 'tags', select: ['color', 'name'] });

  return next({ data: article });
}

/**
 * 获得文章列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getArticleList(req, res, next) {
  const {
    // page = 1, size = 12,
    type,
    tag
  } = req.query;

  // const limit = parseInt(page, 10) * size;
  // const skip = (page - 1) * size;

  let query = {};
  let tagId;

  if (tag && typeof tag === 'string') {
    const tagResult = await mdb.tag.findOne({ name: tag });
    if (tagResult) {
      tagId = tagResult._id;
      query.tags = {
        $in: [tagId]
      };
    }
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
      isDelete: true
    };
  }

  const data = await mdb.article
    .find(query, ['title', 'createTime', 'desc'])
    .sort({ updateTime: -1 })
    // .limit(limit)
    // .skip(skip)
    .populate({ path: 'tags', select: ['name', 'color'] });

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

/**
 * 上传图片
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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

  await mdb.article
    .updateOne({ _id }, { $set: { isPublished: false } })
    .populate({ path: 'tags', select: ['name', 'color'] });

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
