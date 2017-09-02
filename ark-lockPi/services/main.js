// #!/usr/bin/env node

var async = require("async");
var button = require('../services/button.js');
var fs = require('fs');
var Jar = require('../models/jar.js').Jar;
var storage = require('./storage.js');    
var vorpal = require('vorpal')();

module.exports = function (vorpal) {

var emptyMessageWarning = 'Entries must not be empty. For your security, you need to run the "setupLock" command again.'

vorpal
    .command('lock setup', "Setup your lock")
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
                    message: 'Ѧrk Address: ',
                }, function(result){
                    if (result.address) {
                        storage.writeJSON(result.address, 'address');
                        self.log("\n **** Address was set! **** \n");
                        seriesCb(null, result.address, result.lid);
                    } else {
                        self.log(emptyMessageWarning);
                        seriesCb();
                    }
                });
            }, function(address, lid, seriesCb){
                self.prompt({
                    type: 'lid',
                    name: 'lid',
                    message: 'LocationID: ',
                }, function(result){
                    if (result.lid) {
                        storage.writeJSON(result.lid, 'lid');
                        self.log("\n **** LocationID was set! **** \n");
                        seriesCb(null, result.lid);
                    } else {
                        self.log(emptyMessageWarning);
                        seriesCb();
                    }
                });
            }, function(address, seriesCb){
                self.prompt({
                    type: 'price',
                    name: 'price',
                    message: 'Cost of Entry: ',
                }, function(result){
                    if (result.price) {
                        storage.writeJSON(result.price, 'price');
                        console.log("**** Cost of Entry was set! ****");
                        seriesCb(null, address);
                    } else {
                        seriesCb(emptyMessageWarning);
                    }
                });
            }
        ], function(err, result){
            if (err) throw err;
            self.log("successful");
            callback();
        });
    });

  vorpal
    .command('lock info', 'View address, lID, & price')
    .action(function(args, callback, err) {
      if (err) throw err;
      fs.readFile('tmp/jar.json', function readFileCallback(err, data, callback){
        if (err) throw err;
        var parsedJar = JSON.parse(data);
        var stringedJar = JSON.stringify(parsedJar, 'utf8', 2);
        return console.log(stringedJar);
      });
      callback();
  });

  vorpal
    .command('lock pushButton', 'Simulates Button Push')
    .action(function() {
      console.log("Starting Button Test");
      button.wasPushed();
  })

};
