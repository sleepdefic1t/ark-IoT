var fs = require('fs');
var Jar = require('./models/jar.js').Jar;

  /* ============================================ */
  /* =============== JSON Storage =============== */

var writeJSON = function writeJSON(item, toKey) {
  var self = this;
  fs.open('tmp/jar.json', 'r', (err) => {
    if (err) throw err;
    fs.readFile('tmp/jar.json', function readFileCallback(err, data){
      if (err) throw err;
      var newJar = JSON.parse(data, 'utf8', 2);
      switch (true) {
        case (toKey == 'address'): newJar.address = item; break;
        case (toKey == 'lid'): newJar.lid = item; break;
        case (toKey == 'price'): newJar.price = item; break;
        case (toKey == 'receipts'):  newJar.receipts += [item];  break;
      default:
        break;
      }
      var newestJar = JSON.stringify(newJar, 'utf8', 2);
      fs.writeFile("tmp/jar.json", newestJar, function (err) {
        if (err) throw err;
        // return;
      });
    });
  });
};

module.exports = writeJSON, createJSON;

  /* ============================================ */
  /* ============================================ */

