var Wrapper = require('../lib/wrapper'),
    expect = require('expect.js');

describe('wrapper', function() {
  it('wraps', function() {
    var wrapper = new Wrapper(function(data) {
      return data.modules.length + ' modules';
    });

    var packages = [
      { modules: [1, 2, 3] },
      { modules: [4, 5] }
    ];

    expect(wrapper.wrap(packages)).to.be('5 modules');
  });
});
