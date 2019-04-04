/** ********************************
 * desc: 登陆相关控制器
 ******************************** */
const sendMailUntil = require('../utils/sendMail');
const request = require('request-promise');
const crypto = require('crypto');
const uuid = require('uuidv4');
const handler = require('../middlewares/handler-error');

/**
 * githubd第三方登陆
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function githubLogin(req, res, next) {
  const { code } = req.body;
  const bodyString = await request(`https://github.com/login/oauth/access_token?code=${code}&client_id=79c7c7124c99c2c89d7c&client_secret=f34de051bdad672f3e323adebbc71e12df6ec029`);
  const matchToken = bodyString.match(/access_token=(\w+)/i);
  if (matchToken && matchToken[1]) {
    const message = await request({
      url: `https://api.github.com/user?access_token=${matchToken[1]}`,
      headers: {
        'User-Agent': 'blog'
      }
    });
    const token = uuid();

    const userInfo = JSON.parse(message);
    cache.users.set(token, userInfo.login);
    res.cookie('token', token);

    next({
      data: {
        name: userInfo.login,
        account: userInfo.email
      }
    });
  } else {
    next({ err: '登录失败' });
  }
}

async function sendMail(req, res, next) {
  const { email } = req.body;
  let keyCode = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    keyCode += Math.floor(Math.random() * 10);
  }
  req.session.keyCode = keyCode;
  await sendMailUntil(email, keyCode);
  next({ msg: '发送成功' });
}

async function userLogin(req, res, next) {
  const { account, password } = req.body;

  if (!account) {
    return next({ code: 500, msg: '请填写账号' });
  }

  if (!password) {
    return next({ code: 500, msg: '请填写密码' });
  }

  const sPassword = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

  const user = await mdb.user.findOne({ account, password: sPassword }, ['account', 'name']);

  const token = uuid();

  res.cookie('token', token);
  cache.users.set(token, 'jarvan');

  return next({ data: user });
}

async function createUser(req, res, next) {
  const { name, account, password } = req.body;
  const sPassword = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');
  await mdb.user.create({
    name,
    account,
    password: sPassword
  });
  next({ msg: '创建成功' });
}

module.exports = handler({
  githubLogin,
  sendMail,
  userLogin,
  createUser
});
