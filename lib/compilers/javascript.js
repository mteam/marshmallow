exports.match = function(filename) {
  return !!/\.js$/.exec(filename);
};

exports.compile = function(source) {
  return source;
};
