// #!/usr/bin/env node
var async = require("async");
var fs = require('fs');
var Jar = require('../models/jar.js').Jar;
// var rpio = require('rpio');
var vorpal = require('vorpal')();

module.exports = function (vorpal) {

  /* ============================================ */
  /* ================== Setup =================== */
  var writeJSON = require('./storage.js');

  vorpal
    .command('lock setup', "This will help you setup your lock")
    .action(function(args, callback) {
      var self = this;
      async.waterfall([
        function(seriesCb){
          var price;
          var lid;
          var price;
          self.prompt({
            type: 'address',
            name: 'address',
            message: 'Ark Address: ',
          }, function(result){
            if (result.address) {
              writeJSON(result.address, 'address');
              self.log("**** Address was set! ****");
              seriesCb(null, result.address, result.lid);
            } else {
              self.log('Entries must not be empty. For your security, you need to run the "setupLock" command again.');
              seriesCb();
            }
          });
        },
        function(address, lid, seriesCb){
          self.prompt({
            type: 'lid',
            name: 'lid',
            message: 'LocationID: ',
          }, function(result){
            if (result.lid) {
              writeJSON(result.lid, 'lid');
              self.log("**** LocationID was set! ****");
              seriesCb(null, result.lid);
            } else {
              self.log('Entries must not be empty. For your security, you need to run the "setupLock" command again.');
              seriesCb();
            }
          });
        },
        function(address, seriesCb){
          self.prompt({
            type: 'price',
            name: 'price',
            message: 'Cost of Entry: ',
          }, function(result){
            if (result.price) {
              writeJSON(result.price, 'price');
              console.log("**** Cost of Entry was set! ****");
              seriesCb(null, address);
            } else {
              seriesCb('Entries must not be empty. For your security, you need to run the "setupLock" command again.');
            }
          });
        }
      ], function(err, result){
        if (err) throw err;
        self.log("successful");
        callback();
      });
  })

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ========= Get Lock Info ========= */

  vorpal
    .command('lock info', 'Read your address, lid, & price from file')
    .action(function(args, callback, err) {
      if (err) throw err;
      fs.readFile('tmp/jar.json', function readFileCallback(err, data, callback){
        if (err) throw err;
        var parsedJar = JSON.parse(data);
        var stringedJar = JSON.stringify(parsedJar, 'utf8', 2);
        return console.log(stringedJar);
      });
      callback();
  })

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ============== Button Pushed. ============== */

  vorpal
    .command('lock pushButton', 'Simulates Button Push')
    .action(function() {
      console.log("Starting Button Test");
      var buttonWasPushed = require('./unlock.js').buttonWasPushed;
      buttonWasPushed();
  })

}
