/** *********************************************
 * 用户相关
 ********************************************** */

async function get(req, res, next) {
  next({ data: req.session.user });
}

async function t1(req, res, next) {
  req.session.t = 1;
  res.send(200);
}

async function t2(req, res, next) {
  console.log(req.session.t);
  res.send(200);
}

module.exports = {
  get,
  t1,
  t2
};
