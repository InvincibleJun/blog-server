const fictionCtrl = require('../../controllers/fiction');

module.exports = (router, root) => {
  router.get(root + '/search', fictionCtrl.search);
  router.post(root + '/s', fictionCtrl.s);
  router.get(root + '/getChapterList', fictionCtrl.getChapterList);
  router.get(root + '/getOneChapter', fictionCtrl.getOneChapter);
};
