var events = require('events');
var fs = require('fs');
var Jar = require('../models/jar.js').Jar;
// var rpio = require('rpio');
var vorpal = require('vorpal')();


var unlock = new events.EventEmitter();


module.exports = {

  /* ============================================ */
  /* ========= Create Smartbridge Data. ========= */
  // use lid & prices & other to make smartbridge data

  dataNeedsMade: function dataNeedsMade() {
    console.log('**** dataNeedsMade ****');
    console.log("Making Smartbridge data...\n");

    fs.readFile('tmp/jar.json', function readFileCallback(err, data){
      if (err) throw err;
      var newJar = JSON.parse(data, 'utf8', 2);
      let ucData = 'sleepdefIoT' + "|" + newJar.lid + "|" + newJar.price;
      // console.log(ucData);
      // var hash = crypto.createHash('sha256');
      // hash = hash.update(new Buffer(ucData,"utf-8")).digest();
      fs.writeFile("tmp/data.dat", ucData, 'utf8', function (err) {
        if (err) throw err;
        return;
      });
    });
    //if data was presented & scanned
    var nfcWasRequested = require('./nfc.js').nfcWasRequested;
    nfcWasRequested();
  },

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* =============== Check for TX =============== */
  // start checking for tx on mainnet
  // check every X
  // var checkTX = new events.EventEmitter();

  shouldFindTX: function shouldFindTX() {
    console.log('**** shouldFindTX ****');
    console.log("Checking for TX...\n")

  // if (TXFound) {
      var txWasFound = require('./tx').txWasFound;
      return txWasFound();
  // } else {
  //   var shouldFindTX = require('./tx').shouldFindTX;
  //   return shouldFindTX();
  //   return;
  // }
  },

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* =============== Validate TX. =============== */
  // Check found TX for validity before approving unlock

  // var txReceived = new events.EventEmitter();

  txWasFound: function txWasFound() {
    console.log('**** txWasFound ****');
    console.log("Validating...\n");

    // if (TXValid) {
    // UNLOCK
    var shouldUnlock = require('./unlock.js').shouldUnlock;
    shouldUnlock();


      var shouldSaveTX = require('./tx').shouldSaveTX;
      return shouldSaveTX();
    // } else {
    //   return;
    // }
  },

  /* ============================================ */
  /* ============================================ */

  /* ============================================ */
  /* =============== Save TX Info =============== */

  //  save TX to file
  shouldSaveTX: function shouldSaveTX() {
    console.log('**** shouldSaveTX ****');
    console.log('Saving TX...\n');

    console.log('TX Saved!\n');
    console.log('Button Test Completed!\n');

    return;
  }

  /* ============================================ */
  /* ============================================ */

};
