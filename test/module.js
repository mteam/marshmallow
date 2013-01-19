var Module = require('../lib/module'),
    Compilers = require('../lib/compilers'),
    expect = require('expect.js');

describe('module', function() {
  var package = { name: 'foobar', dir: __dirname + '/foo' },
      compilers = new Compilers;

  function newm(filename) {
    var compiler = compilers.find(filename);
    return new Module(__dirname + '/' + filename, package, compiler);
  }

  it('has name', function() {
    var module = newm('foo/lib/bar.js');

    expect(module.name).to.be('foobar/lib/bar');
  });

  it('compiles js', function(done) {
    var module = newm('foo/lib/bar.js');

    module.compile(function(err) {
      expect(module.contents).to.contain('bar module');
      
      done(err);
    });
  });

  it('compiles json', function(done) {
    var module = newm('foo/lib/foo.json');

    module.compile(function(err) {
      expect(module.contents).to.contain('module.exports');
      expect(module.contents).to.contain('"module": "foo"');

      done(err);
    });
  });
});
