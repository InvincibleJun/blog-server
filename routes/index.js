const express = require("express");
const path = require("path");
const fs = require("fs");

function createRouter(versionDir) {
  let router = express.Router();
  fs.readdirSync(versionDir).forEach(file => {
    let rootRouter = file.replace(/\.js$/, "");
    require(path.join(versionDir, file))(router, "/" + rootRouter);
  });
  return router;
}

const router = express.Router();
const api = createRouter(path.join(__dirname, "api"));

router.use("/api", api);

module.exports = router;
