var Compilers = require('../lib/compilers'),
    expect = require('expect.js');

var javascript = require('../lib/compilers/javascript'),
    json = require('../lib/compilers/json');

describe('compilers', function() {
  it('finds compilers', function() {
    var c = new Compilers;

    expect(c.find('/foo/bar/baz.js')).to.be(javascript);
    expect(c.find('/foo/bar/baz.json')).to.be(json);
    expect(c.find('/foo/bar.baz')).to.be(null);
  });

  it('registers compilers', function() {
    var c = new Compilers;

    var baz = {
      match: function(filename) {
        return filename == '/foo/bar.baz';
      }
    };

    c.register(baz);

    expect(c.find('/foo/bar.baz')).to.be(baz);
  });

  describe('javascript', function() {
    it('does not change anything', function() {
      var code = 'alert("foo")';

      expect(javascript.compile(code)).to.be(code);
    });
  });

  describe('json', function() {
    it('exports the object', function() {
      var code = '{ "foo": "bar" }',
          output = json.compile(code);

      expect(output).to.contain('module.exports');
      expect(output).to.contain(code);
    });
  });
});
