var fs = require('fs');
var Jar = require('../models/jar.js').Jar;
// var rpio = require('rpio');
var vorpal = require('vorpal')();


  /* ============================================ */
  /* ========== Present NFC TX Request ========== */

  // wake NFC GPIO
  // present tx request via nfc
  //rpio.open(01, rpio.INPUT, rpio.PULL_DOWN);
  function nfcWasRequested() {
    console.log('**** nfcWasRequested ****');
    console.log("Presenting data via NFC... \n")
      //present data via NFC
    fs.readFile('tmp/data.dat', 'utf8', function readFileCallback(err, data){
      if (err) throw err;
      var newData = JSON.stringify(data, 'utf8');
      // console.log(newData);
    //   // if data was presented & scanned
    });
    var nfcWasScanned = require('./nfc.js').nfcWasScanned;
    nfcWasScanned();
  }
  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ========== NFC TX Acknowledgement ========== */

  // confirm that NFC data was scanned
  // nfc sleep after nfc scanned
  // triggers check for TX cycle
  function nfcWasScanned() {
    console.log('**** nfcWasScanned ****');
    console.log("Confirming NFC was scanned...\n");

    // if TX valid
    var shouldFindTX = require('./tx.js').shouldFindTX;
    shouldFindTX();
  }
  /* ============================================ */
  /* ============================================ */


module.exports = {
  nfcWasRequested: nfcWasRequested,
  nfcWasScanned: nfcWasScanned
}
