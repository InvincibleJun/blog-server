const drafCtrl = require("../../controllers/draft");

module.exports = (router, root) => {
  router.post(root + "/add", drafCtrl.add);
  router.get(root + "/get", drafCtrl.get);
  router.get(root + "/upload", drafCtrl.upload);
};
