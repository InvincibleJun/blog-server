const request = require('request')
async function githubLogin(req, res) {
  let code = req.query.code;
  request(
    `https://github.com/login/oauth/access_token?code=${code}&client_id=79c7c7124c99c2c89d7c&client_secret=f34de051bdad672f3e323adebbc71e12df6ec029`,
    (err, response, body) => {
      let str = response.body;
      let result = str.match(/access_token=(\w+)/i);
      if (result && result[1]) {
        request(
          {
            url: `https://api.github.com/user?access_token=${result[1]}`,
            headers: {
              "User-Agent": "blog"
            }
          },
          (err, response, body) => {
            res.send(body);
          }
        );
      }
    }
  );
}

module.exports = {
  githubLogin
};
