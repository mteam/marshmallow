var defaults = [require('./javascript'), require('./json')];

function Compilers() {
  this.compilers = defaults.slice();
}

Compilers.prototype.register = function(compiler) {
  this.compilers.push(compiler);
};

Compilers.prototype.find = function(filename) {
  for (var i = 0; i < this.compilers.length; i++) {
    if (this.compilers[i].match(filename)) {
      return this.compilers[i];
    }
  }

  return null;
};

module.exports = Compilers;
