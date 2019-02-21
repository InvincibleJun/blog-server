const userCtrl = require('../../controllers/user');

module.exports = (router) => {
  router.post('/user/login', userCtrl.userLogin);

  // 创建用户
  router.post('/user', userCtrl.createUser);

  router.get('/user/github', userCtrl.githubLogin);

  // router.get('/tags', tagCtrl.getTagList);

  // router.delete('/tags/:id', tagCtrl.deleteTag);
};
