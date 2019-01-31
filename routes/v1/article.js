const articleCtrl = require('../../controllers/article');

module.exports = (router) => {
  router.post('/articles', articleCtrl.createArticle);

  router.put('/articles/:_id', articleCtrl.updateArticle);

  router.put('/articles/:id/:status', articleCtrl.publishArticle);

  router.get('/articles', articleCtrl.getArticleList);

  router.get('/articles/:_id', articleCtrl.getArticle);

  router.delete('/articles/:id', articleCtrl.deleteArticle);
};
