var ejs = require('ejs'),
    fs = require('fs');

var tmpl = (function() {
  var file = __dirname + '/template.ejs',
      raw = fs.readFileSync(file, 'utf-8');
  
  return ejs.compile(raw);
})();

function Wrapper(render) {
  this.render = render || tmpl;
}

Wrapper.prototype.wrap = function(packages) {
  var modules = packages.reduce(function(prev, curr) {
    return prev.concat(curr.modules);
  }, []);

  return this.render({ modules: modules });
};

module.exports = Wrapper;
