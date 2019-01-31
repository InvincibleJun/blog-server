const express = require('express');
const path = require('path');
const fs = require('fs');

function createRouter(versionDir) {
  const router = express.Router();
  fs.readdirSync(versionDir).forEach((file) => {
    /* eslint-disable-next-line */
    require(path.join(versionDir, file))(router);
  });
  return router;
}

const router = express.Router();
const api = createRouter(path.join(__dirname, 'v1'));

router.use('/api/v1', api);
router.use('/api', api);

module.exports = router;
