var async = require("async");
var events = require('events');
var fs = require('fs');
var Jar = require('./models/jar.js').Jar;
// var rpio = require('rpio');
var vorpal = require('vorpal')();

module.exports = function (vorpal) {

  /* ============================================ */
  /* ================== Setup =================== */

  var writeJSON = require('./services/storage.js');

vorpal
  .command('lock setup', "This will help you setup your lock")
  .option('-i, --initial', 'Clears ALL previous lock data')
  .action(function(args, callback) {
    var self = this;
    if (args.options.initial) {
      jsonCreate.on('shouldCreateJSON', shouldCreateJSON);
      jsonCreate.emit('shouldCreateJSON');
    }
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
            seriesCb(null, result.address);
          } else {
            self.log('Entries must not be empty. For your security, you need to run the "setupLock" command again.');
            seriesCb();
          }
        });
      },
      function(lid, seriesCb){
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
      function(price, seriesCb){
        self.prompt({
          type: 'price',
          name: 'price',
          message: 'Cost of Entry: ',
        }, function(result){
          if (result.price) {
            writeJSON(result.price, 'price');
            console.log("**** Cost of Entry was set! ****");
          } else {
            seriesCb('Entries must not be empty. For your security, you need to run the "setupLock" command again.');
            seriesCb();
          }
        });
      }
    ], function(err){
      if (err) throw err;
      self.log("successful");
      vorpal.exec('exit');
      return callback();
    });
  });

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
  });

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ============== Button Pushed. ============== */
  // detect button push GPIO

  vorpal
    .command('lock buttonPush', 'Simulates Button Push')
    .action(function() {
      console.log("Starting Button Test")
      buttonPush.on('buttonWasPushed', buttonWasPushed);
      buttonPush.emit('buttonWasPushed');
    });

    // rpio.open(00, rpio.INPUT, rpio.PULL_DOWN);
    // rpio.poll(1, buttonPush);
    // function buttonPush(pin){
    // 	// var state = rpio.read(pin) ? 'pressed' : 'notPressed';
    // 	// if (state == 'pressed') {
    // 		// makeTX
    //     nfcData.emit('dataNeedsMade');
    // 	// }
    // }




  var buttonPush = new events.EventEmitter();

  var buttonWasPushed = function () {
    console.log('**** buttonWasPushed ****');
    console.log("Getting ready to make TX Requests...\n");
    //call NFC


    // if data was presented & scanned
    nfcData.on('dataNeedsMade', dataNeedsMade);
    nfcData.emit('dataNeedsMade');
  };

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* =========== Make NFC TX Request. =========== */
	/* ========= Create Smartbridge Data. ========= */
  // use lid & prices & other to make smartbridge data

  var nfcData = new events.EventEmitter();

  var dataNeedsMade = function () {
    console.log('**** dataNeedsMade ****');
    console.log("Making Smartbridge data...\n");

    //make data for NFC

    fs.readFile('tmp/jar.json', function readFileCallback(err, data){
      if (err) throw err;
      var newJar = JSON.parse(data, 'utf8', 2);
      let ucData = 'sleepdefIoT' + "|" + newJar.lid + "|" + newJar.price;
      console.log(ucData);
      // var hash = crypto.createHash('sha256');
      // hash = hash.update(new Buffer(ucData,"utf-8")).digest();
      fs.writeFile("tmp/ucData.dat", ucData, 'utf8', function (err) {
        if (err) throw err;
        return;
      });
    });
    // if data was presented & scanned
    nfcRequest.on('nfcWasRequested', nfcWasRequested);
    nfcRequest.emit('nfcWasRequested');
  };

  /* ============================================ */
  /* ============================================ */


    /* ============================================ */
    /* ========== Present NFC TX Request ========== */
    // wake NFC GPIO
    // present tx request via nfc
    //rpio.open(01, rpio.INPUT, rpio.PULL_DOWN);

    var nfcRequest = new events.EventEmitter();

    var nfcWasRequested = function () {
      console.log('**** nfcWasRequested ****');
      console.log("Presenting data via NFC...")
      //present data via NFC
      fs.readFile('tmp/ucData.dat', 'utf8', function readFileCallback(err, data){
        if (err) throw err;
        var newData = JSON.stringify(data, 'utf8');
        // console.log(newData);
    //   // if data was presented & scanned
      nfcScanned.on('nfcWasScanned', nfcWasScanned);
      nfcScanned.emit('nfcWasScanned');
    });
  };
    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ========== NFC TX Acknowledgement ========== */
    // confirm that NFC data was scanned
    // nfc sleep after nfc scanned
    // triggers check for TX cycle

    var nfcScanned = new events.EventEmitter();

    var nfcWasScanned = function () {
      console.log('**** nfcWasScanned ****');
      console.log("Confirming NFC was scanned...\n");

      // if TX valid
      checkTX.on('shouldCheckTX', shouldCheckTX);
      checkTX.emit('shouldCheckTX');
    };
    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* =============== Check for TX =============== */
    // start checking for tx on mainnet
    // check every X

    var checkTX = new events.EventEmitter();

    var shouldCheckTX = function () {
      console.log('**** shouldCheckTX ****');
      console.log("Checking for TX...\n")
    // if (TXFound) {
      txReceived.on('txWasReceived', txWasReceived)
      txReceived.emit('txWasReceived');
    // } else {
    //   return;
    // }
    };

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* =============== Validate TX. =============== */
    // Check found TX for validity before approving unlock

    var txReceived = new events.EventEmitter();

    var txWasReceived = function () {
      console.log('**** txWasReceived ****');
      console.log("Validating...\n")

      // if (TXValid) {
      unlock.on('shouldUnlock', shouldUnlock);
      unlock.emit('shouldUnlock');
      // } else {
      //   return;
      // }
    };

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ================== Unlock ================== */
    // do unlock on pins
    //rpio.open(02, rpio.INPUT, rpio.PULL_DOWN);

    var unlock = new events.EventEmitter();

    var shouldUnlock = function () {
      console.log('**** shouldUnlock ****');
      console.log('Unlocking...\n');

      console.log('********** Unlocked **********\n');

      //if was unlocked
      // unlocked.on('wasUnlocked', wasUnlocked);
      // unlocked.emit('wasUnlocked');
    };

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Verify Unlock. ============== */
    // check if unlock was successful on pins

    // var unlocked = new events.EventEmitter();
    //
    // var wasUnlocked = function () {
    //   console.log('**** wasUnlocked ****');
    //   console.log('Verifying...\n');
    //
    //   // if unlock was verified
    //   saveTX.on('shouldSaveTX', shouldSaveTX);
    //   saveTX.emit('shouldSaveTX');
    // };
    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* =============== Save TX Info =============== */
    //  save TX to file

    var saveTX = new events.EventEmitter();

    var shouldSaveTX = function (callback) {
      console.log('**** shouldSaveTX ****');
      console.log('Saving TX...\n');

      console.log('TX Saved!\n');
      console.log('Button Test Completed!\n');

      return;
    };

    /* ============================================ */
    /* ============================================ */

}

/* ============================================ */
/* =============== Data Storage =============== */

var jsonCreate = new events.EventEmitter();

var shouldCreateJSON = function() {
  var json = JSON.stringify(Jar);
  fs.writeFile('tmp/jar.json', json, 'utf8', 2, function(err) {
    if (err) throw err;
  });
  return;
};

function writeJSON(item, toKey) {
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
        case (toKey == 'receipts'):    newJar.receipts += [item];  break;
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
