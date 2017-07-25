#!/usr/bin/env node
var async = require("async");
var events = require('events');
var fs = require('fs');
var Jar = require('./models/jar.js').Jar;
// var rpio = require('rpio');
var vorpal = require('vorpal')();

module.exports = function (vorpal) {

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
      fs.writeFile("tmp/data.dat", ucData, 'utf8', function (err) {
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
      fs.readFile('tmp/data.dat', 'utf8', function readFileCallback(err, data){
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

