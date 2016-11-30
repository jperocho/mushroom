'use strict'
var fs = require('fs');
fs.readdirSync(__dirname + '/').forEach(function(file){
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '').replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    module.exports[name] = require('./' + file);
  }
});