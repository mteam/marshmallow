exports.match = function(filename) {
  return !!/\.json/.exec(filename);
};

exports.compile = function(source) {
  return 'module.exports = ' + source + ';';
};
