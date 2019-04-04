/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
function catchError(controller) {
  return (req, res, next) => {
    const func = controller.apply(null, [req, res, next]);
    if (func && typeof func.then === 'function') {
      func.catch(err => next({ err: err.toString() }));
    }
  };
}

function handler(arg) {
  if (typeof arg === 'function') {
    catchError(arg);
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const func in arg) {
      if (typeof arg[func] === 'function') {
        // eslint-disable-next-line no-param-reassign
        arg[func] = catchError(arg[func]);
      }
    }
  }
  return arg;
}

module.exports = handler;
