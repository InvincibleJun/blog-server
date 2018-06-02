const articleCtrl = require('../../controllers/article');

module.exports = (router, root) => {
  router.get(root + '/get', articleCtrl.get);
  router.get(root + '/getOne', articleCtrl.getOne);
  router.get(root + '/getList', articleCtrl.getList);
  router.get(root + '/getNewList', articleCtrl.getNewList);
  router.post(root + '/del', articleCtrl.del);
};
