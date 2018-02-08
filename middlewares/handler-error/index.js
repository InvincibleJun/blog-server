function handler(arg) {
  if (typeof arg === 'function') {
    hanler(arg)
  } else {
    for (let func of arg) {
      hanler(func)
    }
  }
}

function hanler(func) {
  return function (req, res, next) {
    try {
      func.apply(null, req, res, next)
    } catch (e) {
    }
  }
}

module.exports = handler