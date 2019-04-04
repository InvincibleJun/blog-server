const userCtrl = require('../../controllers/user');

module.exports = (router) => {
  router.post('/user/login', userCtrl.userLogin);

  // 创建用户
  router.post('/user', userCtrl.createUser);

  router.post('/user/github', userCtrl.githubLogin);
};
