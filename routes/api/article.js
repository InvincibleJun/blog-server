const articleCtrl = require("../../controllers/article");

module.exports = (router, root) => {
  router.get(root + "/get", articleCtrl.get);
  router.get(root + "/getOne", articleCtrl.getOne);
  router.get(root + "/getNewList", articleCtrl.getNewList)
};
