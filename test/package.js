var Package = require('../lib/package'),
    Compilers = require('../lib/compilers'),
    expect = require('expect.js');

describe('package', function() {
  var compilers = new Compilers;

  function newp(name, dir, pattern) {
    return new Package(name, __dirname + '/' + dir, pattern, compilers);
  }

  it('discovers', function(done) {
    var pkg = newp('foobar', 'foo');

    pkg.discover(function(err) {
      expect(pkg.modules).to.have.length(3);

      pkg.modules.forEach(function(module) {
        expect(module.name).to.match(/^foobar\/(lib\/(bar|foo)|index)$/);
      });

      done(err);
    });
  });

  it('discovers with another pattern', function(done) {
    var pkg = newp('barbaz', 'baz', 'lib/**/*');

    pkg.discover(function(err) {
      expect(pkg.modules).to.have.length(1);
      expect(pkg.modules[0].name).to.be('barbaz/lib/module');

      done(err);
    });
  });

  it('compiles', function(done) {
    var files = [
      'foo/index.js', 'foo/lib/bar.js', 'foo/lib/foo.json'
    ].map(function(file) { return __dirname + '/' + file });

    var pkg = newp('foobar', 'foo');

    pkg.initialize(files);

    pkg.compile(function(err) {
      expect(pkg.modules[0].contents).to.contain('index module');
      expect(pkg.modules[1].contents).to.contain('bar module');
      expect(pkg.modules[2].contents).to.contain('module.exports');
      expect(pkg.modules[2].contents).to.contain('"module": "foo"');

      done(err);
    });
  });
});
