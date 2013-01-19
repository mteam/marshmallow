var async = require('async'),
    Package = require('./package'),
    Compilers = require('./compilers'),
    Wrapper = require('./wrapper');

function Marshmallow(packages) {
  this.compilers = new Compilers;
  this.wrapper = new Wrapper;

  this.packages = [];

  var name, opts;
  for (name in packages) {
    opts = packages[name];
    this.packages.push(new Package(name, opts.dir, opts.include, this.compilers));
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

module.exports = function(packages) {
  return new Marshmallow(packages);
};
