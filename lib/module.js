var fs = require('fs'),
    path = require('path');

function Module(filename, package, compiler) {
  this.filename = filename;
  this.package = package;
  this.compiler = compiler;

  this.source = null;
  this.contents = null;

  var relative = path.relative(package.dir, filename),
      match = /(.+)\.\w+$/.exec(relative);
  
  if (!match)
    throw new Error('invalid module filename: ' + filename);

  this.name = package.name + '/' + match[1];
}

Module.prototype.read = function(done) {
  var self = this;

  fs.readFile(this.filename, 'utf-8', function(err, source) {
    err || (self.source = source);
    done(err);
  });
};

Module.prototype.compile = function(done) {
  var self = this;

  this.read(function(err) {
    err || (self.contents = self.compiler.compile(self.source));
    done(err);
  });
};

module.exports = Module;
