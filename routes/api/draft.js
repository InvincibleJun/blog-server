const drafCtrl = require("../../controllers/draft");

module.exports = (router, root) => {
  router.post(root + "/add", drafCtrl.add);
  router.get(root + "/get", drafCtrl.get);
  router.post(root + "/upload", drafCtrl.upload);
  router.get(root + "/getOne", drafCtrl.getOne);
  router.get(root + "/publish", drafCtrl.publish);
  router.get(root + "/del", drafCtrl.del);
  router.get(root + "/getList", drafCtrl.getList);
};
