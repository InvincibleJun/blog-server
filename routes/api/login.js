const login = require("../../controllers/login");

module.exports = (router, root) => {
  router.get(root + "/github", login.githubLogin);
};
