module.exports = function awrap(fn) {
  if (fn.length == 4) {
    return function(err, req, res, next) {
      return fn.call(this, err, req, res, next).catch(next)
    }
  } else if (fn.length == 3 || fn.length == 2) { // (req, res) => {} or (req, res, next) => {}
    return function(req, res, next) {
      return fn.call(this, req, res, next).catch(next)
    }
  } else {
    throw new Error('invalid parameter length ' + fn.length + '. expressjs must take 2, 3 or 4 params.')
  }
}
