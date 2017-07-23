#!/usr/bin/env node

var arkjs = require("arkjs");
var async = require("async");
var events = require('events');
var fs = require('fs');
// var rpio = require('rpio');
var vorpal = require('vorpal')();

/* FIXME: not safe. Need to consolidate and encrypt data. */
const ACCOUNT_FILE = 'tmp/address.txt';
const LID_FILE = 'tmp/lid.txt';
const PRICE_FILE = 'tmp/price.txt';


/* ============================================================ */
/* ======================= Ark-Lock-Pi ======================== */
/* ============================================================ */


module.exports = function (vorpal) {

/* ============================================ */
/* ================== Setup =================== */

vorpal
  .command('setupLock', "This will help you setup your lock")
  .action(function(args, callback) {
    var self = this;
    async.waterfall([
      function(seriesCb){
        self.prompt({
          type: 'address',
          name: 'address',
          message: 'Ark Address: ',
        }, function(result){
          if (result.address) {
            write(result.address, ACCOUNT_FILE);
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
            write(result.lid, LID_FILE);
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
            console.log("**** Cost of Entry was set! ****");
            write(result.price, PRICE_FILE);
            seriesCb(null, result.price);
          } else {
            seriesCb('Entries must not be empty. For your security, you need to run the "setupLock" command again.');
          }
        });
      }
    ], function(err){
      if(err){
        self.log(err);
      }
      else{
        self.log("successful");
      }
      return callback();
    });
  });

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ============== Get Lock Info. ============== */

  vorpal
    .command('getLockInfo', 'Read your address, lid, & price from file')
    .action(function(args, callback, err) {
      if (!err) {
        /* ===== Address ===== */
        var address = '';
        var readStream = fs.createReadStream(ACCOUNT_FILE, 'utf8');
        readStream.on('data', function(chunk) {
          address += chunk;
        })
        .on('end', function() { console.log('\nAddress: ' + address) })
        .on('error', function(){ console.log("Address not found") });

        /* ===== LocationID ===== */
        var lid = '';
        readStream = fs.createReadStream(LID_FILE, 'utf8');
        readStream.on('data', function(chunk) {
          lid += chunk;
        })
        .on('end', function() { console.log('lid = ' + lid) })
        .on('error', function(){ console.log("Lid not found") });

        /* TODO: Add ItemID */
        /* ===== ItemID ===== */

        /* ===== Price ===== */
        var price = '';
        readStream = fs.createReadStream(PRICE_FILE, 'utf8');
        readStream.on('data', function(chunk) {
          price += chunk;
        })
        .on('end', function() {  console.log('Cost: ' + price) })
        .on('error', function(){ console.log("price not found") });

      };
      callback();
    });

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Button Pushed. ============== */
  // detect button push GPIO

    vorpal
      .command('pushButton', 'Simulates Button Push')
      .action(function() {
        console.log("Simulating Button Push\n");

        console.log("Starting Button Test\n")

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

      //make data for NFC

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
      console.log("Making NFC data...\n");

      //make data for NFC

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
      console.log("Presenting data via NFC...\n")

      //present data via NFC

      // if data was presented & scanned
      nfcScanned.on('nfcWasScanned', nfcWasScanned);
      nfcScanned.emit('nfcWasScanned');
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

      // if TX valid
      txReceived.on('txWasReceived', txWasReceived)
      txReceived.emit('txWasReceived');
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

      // if TX valid
      unlock.on('shouldUnlock', shouldUnlock);
      unlock.emit('shouldUnlock');
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

      //if was unlocked
      unlocked.on('wasUnlocked', wasUnlocked);
      unlocked.emit('wasUnlocked');
    };

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Verify Unlock. ============== */
    // check if unlock was successful on pins

    var unlocked = new events.EventEmitter();

    var wasUnlocked = function () {
      console.log('**** wasUnlocked ****');
      console.log('Verifying...\n');

      // if unlock was verified
      saveTX.on('shouldSaveTX', shouldSaveTX);
      saveTX.emit('shouldSaveTX');
    };
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

function write(item, toFile) {
  if (item && toFile) {
    var newItem = item;
    var newfile = toFile;
    fs.writeFile(newfile, newItem, function(err){
      if (err) throw err;
    });
  }
};
