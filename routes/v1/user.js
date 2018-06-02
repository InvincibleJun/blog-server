const user = require('../../controllers/user');

module.exports = (router, root) => {
  router.get(root + '/github', user.githubLogin);
  router.post(root + '/sendMail', user.sendMail);
};
