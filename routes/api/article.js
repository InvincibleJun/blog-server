const articleCtrl = require("../../controllers/article");

module.exports = (router, root) => {
  router.get(root + "/get", articleCtrl.get);
};
