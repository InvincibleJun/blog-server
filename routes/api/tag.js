const tag = require("../../controllers/tag");

module.exports = (router, root) => {
  router.post(root + "/add", tag.add);
  router.get(root + "/getList", tag.getList);
};
