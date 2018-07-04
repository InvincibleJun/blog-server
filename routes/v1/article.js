const articleCtrl = require('../../controllers/article');

module.exports = (router, root) => {
  router.post(`${root}/add`, articleCtrl.addArticle);
  router.get(`${root}/getOne`, articleCtrl.getOne);
  router.get(`${root}/getList`, articleCtrl.getList);
  // router.get(`${root}/getNewList`, articleCtrl.getNewList);
  // router.post(`${root}/del`, articleCtrl.del);
};
