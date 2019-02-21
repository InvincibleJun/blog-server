const articleCtrl = require('../../controllers/article');

module.exports = (router) => {
  router.post('/articles', articleCtrl.createArticle);

  router.put('/articles/:_id', articleCtrl.updateArticle);

  router.put('/articles/:_id/:status', articleCtrl.publishArticle);

  router.get('/articles', articleCtrl.getArticleList);

  router.get('/articles/:_id', articleCtrl.getArticle);

  router.delete('/articles/:_id', articleCtrl.deleteArticle);

  router.post('/articles/image', articleCtrl.uploadImage);
};
