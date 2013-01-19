var async = require('async'),
    Package = require('./package'),
    Compilers = require('./compilers'),
    Wrapper = require('./wrapper');

function Marshmallow(opts) {
  this.compilers = new Compilers;
  this.wrapper = new Wrapper;

  this.packages = [];

  var name, dir, pattern;
  for (name in opts) {
    if (Array.isArray(opts[name])) {
      dir = opts[name][0];
      pattern = opts[name][1];
    } else {
      dir = opts[name];
      pattern = null;
    }

    this.packages.push(new Package(name, dir, pattern, this.compilers));
  }
}

Marshmallow.prototype.compile = function(done) {
  var self = this;

  async.parallel(
    this.packages.map(this.process),
    function(err) {
      done(err, !err && self.wrapper.wrap(self.packages));
    }
  );
};

Marshmallow.prototype.process = function(package) {
  return function(done) {
    async.series([
      package.discover.bind(package),
      package.compile.bind(package)
    ], done);
  };
};

module.exports = function(opts) {
  return new Marshmallow(opts);
};
