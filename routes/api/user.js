const userCtrl = require("../../controllers/user");

module.exports = (router, root) => {
  router.get(root + "/get", userCtrl.get);
  router.get(root + "/t1", userCtrl.t1);
  router.get(root + "/t2", userCtrl.t2);
};
