function finallyOutput(arg, req, res, next) {
  if (!arg) {
    next();
  }

  if (arg.err) {
    res.send({
      code: 500,
      err: arg.err
    });
  }

  if (typeof arg === 'number') {
    res.send(arg);
  } else {
    const {
      code = 200, msg = '请求成功', data = null, extData = null
    } = arg;
    if (code !== 200) {
      res.status(arg.code);
    }

    res.send({
      code,
      msg,
      data,
      success: true,
      extData
    });
  }
}

module.exports = finallyOutput;
