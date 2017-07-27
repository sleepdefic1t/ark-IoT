var ark = require('arkjs');
var events = require('events');
var fs = require('fs');
var Jar = require('../models/jar.js').Jar;
// var rpio = require('rpio');
var vorpal = require('vorpal')();


var unlock = new events.EventEmitter();

function dataNeedsMade() {
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
}

/* ============================================ */
/* ============================================ */

/* ============================================ */
/* ================= Make  TX ================= */


function shouldMakeTX() {
  console.log('**** shouldMakeTX ****');
  console.log("Making TX...\n")

  //   var amount      = 1.0 * Math.pow(10, 8); // 100000000000
  // var transaction = ark.transaction.createTransaction("hxuG6XABWSN7swQ6Y8ner1CYHfTLeHLH6euB52fAtW6qRcbSfA", amount,null "passphrase", "secondPassphrase");

  // if (TXFound) {
    var shouldFindTX = require('./tx').shouldFindTX;
    return shouldFindTX();
  // } else {
  //   var shouldFindTX = require('./tx').shouldFindTX;
  //   return shouldFindTX();
  //   return;
  // }
}

/* ============================================ */
/* ============================================ */

/* ============================================ */
/* =============== Check for TX =============== */
// start checking for tx on mainnet
// check every X
// var checkTX = new events.EventEmitter();

function shouldFindTX() {
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
}

/* ============================================ */
/* ============================================ */


/* ============================================ */
/* =============== Validate TX. =============== */
// Check found TX for validity before approving unlock

// var txReceived = new events.EventEmitter();

function txWasFound() {
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
}

/* ============================================ */
/* ============================================ */

/* ============================================ */
/* =============== Save TX Info =============== */

//  save TX to file
function shouldSaveTX() {
  console.log('**** shouldSaveTX ****');
  console.log('Saving TX...\n');

  console.log('TX Saved!\n');
  console.log('Button Test Completed!\n');

  return;
}

module.exports = {
  dataNeedsMade: dataNeedsMade,
  shouldMakeTX: shouldMakeTX,
  shouldFindTX: txWasFound,
  txWasFound: txWasFound,
  shouldSaveTX: shouldSaveTX
}
