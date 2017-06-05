function bool (def) {
  return function (val) {
    if (val === undefined) {
      return def
    }

    if (def === true) {
      return val !== undefined &&
        (val === false || val === 'false' || val === 'no' || val === 'n' || val === '0')
          ? false
          : true
    }

    return val !== undefined &&
      (val === true || val === 'true' || val === 'yes' || val === 'y' || val === '1')
        ? true
        : false
  }
}

module.exports.bool = {
  true: bool(true),
  false: bool(false),
}
