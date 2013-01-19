var glob = require('glob'),
    Batch = require('batch'),
    Module = require('./module'),
    Compilers = require('./compilers');

function Package(name, dir, compilers) {
  this.name = name;
  this.dir = dir;
  this.compilers = compilers;

  this.modules = null;
}

Package.prototype.discover = function(done) {
  var pattern = this.dir + '/**/*',
      self = this;

  glob(pattern, function(err, files) {
    err || self.initialize(files);
    done(err);
  });
};

Package.prototype.initialize = function(files) {
  var self = this;
  this.modules = [];

  files.forEach(function(file) {
    var compiler = self.compilers.find(file);

    if (compiler)
      self.modules.push(new Module(file, self, compiler));
  });
};

Package.prototype.compile = function(done) {
  var batch = new Batch;

  this.modules.forEach(function(module) {
    batch.push(function(done) {
      module.compile(done);
    });
  });

  batch.end(done);
};

module.exports = Package;
