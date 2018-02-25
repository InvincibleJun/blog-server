function finallyOutput(arg, req, res, next) {
  if (!arg) { next() }
  if (typeof arg === 'Number') {
    res.send(arg)
  } else {
    res.send({
      code: arg.code || 0,
      msg: arg.msg || '请求成功',
      data: arg.data || null,
      success: true,
      extData: arg.extData || null
    })
  }
}

module.exports = finallyOutput;