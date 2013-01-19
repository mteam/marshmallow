var mm = require('../lib/index'),
    expect = require('expect.js');

describe('marshmallow', function() {
  it('works', function(done) {
    var dirs = {
      bar: __dirname + '/bar',
      foo: __dirname + '/foo',
      baz: [__dirname + '/baz', 'lib/**/*']
    };

    mm(dirs).compile(function(err, output) {
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
