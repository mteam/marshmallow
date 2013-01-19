var mm = require('../lib/index'),
    expect = require('expect.js');

describe('marshmallow', function() {
  function d(dir) {
    return __dirname + '/' + dir;
  }

  it('works', function(done) {
    var pkgs = {

      bar: {
        dir: d('bar')
      },

      foo: {
        dir: d('foo')
      },

      baz: {
        dir: d('baz'),
        include: 'lib/**/*'
      }

    };

    mm(pkgs).compile(function(err, output) {
      var e = expect(output);

      e.to.contain('baz module');
      e.to.contain('"module": "foo"');
      e.to.contain('bar module');
      e.to.contain('foo/lib/bar');
      e.to.contain('baz/lib/module');
      e.to.not.contain('baz/test/index');

      done(err);
    });
  });
});
