const tagCtrl = require('../../controllers/tag');

module.exports = (router) => {
  router.post('/tags', tagCtrl.createTag);

  router.get('/tags', tagCtrl.getTagList);

  router.delete('/tags/:id', tagCtrl.deleteTag);
};
