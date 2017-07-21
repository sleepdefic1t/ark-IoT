#!/usr/bin/env node

var arkjs = require("arkjs");
var fs = require('fs');
var vorpal = require('vorpal')();

/* === uncomment 'rpio' for live-device testing === */
// var rpio = require('rpio');


/* FIXME: not safe. Need to consolidate and encrypt data. */
const ACCOUNT_FILE = 'tmp/address.txt';
const LID_FILE = 'tmp/lid.txt';
const PRICE_FILE = 'tmp/price.txt';


module.exports = function (vorpal) {

/* TODO: */
/* 1: encrypt & hide data & functions. Swiss cheese like whoa. Utilize clients Signing function. JSON File? */
/* 2:  */
/* 3: cleanup with prompt-flow. Switches?  Waaaay too much repitition */



/* ============================================ */
/* ========= Set and Get Lock Address ========= */


/* ==== */
/* Set */
vorpal
  .command('setLockAddress')
  .action(function(args, callback) {
		var self = this;
    return this.prompt({
      type: 'address',
      name: 'address',
      message: 'Ark Address: ',
    }, function(result){
      if (result.address) {
        try{
          var address = result.address;
          self.log("**seting Lock Address**");
          write(address, ACCOUNT_FILE);
          callback();
        }
        catch(error){
          self.log("Failed: ", error);
        }
        callback();
      } else {
        self.log('lid must not be empty');
        callback();
      }
    });
  });


/* ==== */
/* Get */
vorpal
  .command('getLockAddress', 'Read your locks address')
  .action(function(args, callback, err) {
    if (!err) {
      var data = '';
      var readStream = fs.createReadStream(ACCOUNT_FILE, 'utf8');
      readStream.on('data', function(chunk) {
        data += chunk;
      })
      .on('end', function() { console.log(data)})
      .on('error', function(){ console.log("Address not found") });
      callback();
    };
    callback();
  });


/* ============================================ */
/* ============================================ */


/* ============================================ */
/* ======= Set Lock LocationID & Price ======= */


/* ============ */
/* setLock lid */


vorpal
  .command('setLid')
  .action(function(args, callback) {
		var self = this;
    return this.prompt({
      type: 'lid',
      name: 'lid',
      message: 'locationID: ',
    }, function(result){
      if (result.lid) {
        try{
          var lid = result.lid;
          self.log("**setPrice**");
          write(lid, LID_FILE);
          callback();
        }
        catch(error){
          self.log("Failed: ", error);
        }
        callback();
      } else {
        self.log('lid must not be empty');
        callback();
      }
    });
  });


/* ============== */
/* setLock Price */

vorpal
  .command('setPrice')
  .action(function(args, callback) {
		var self = this;
    return this.prompt({
      type: 'price',
      name: 'price',
      message: 'cost of Entry ("5"): ',
    }, function(result){
      if (result.price) {
        try{
          var price = result.price;
          console.log("**setPrice**");
          write(price, PRICE_FILE);
          callback();
        }
        catch(error){
          self.log("Failed: ", error);
        }
        callback();
      } else {
        self.log('Price must not be empty. Example : setPrice 5');
        callback();
      }
    });
  });

  /* ============================================ */
  /* ============================================ */




  /* ============================================ */
  /* ========= Get Unlock Info ========= */


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
    /* ========= Create Smartbridge Data. ========= */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Button Pushed. ============== */
    /* ================= Tell NFC ================= */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* =========== Make NFC TX Request. =========== */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ========== Present NFC TX Request ========== */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ========== NFC TX Acknowledgement ========== */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Check for TX ================ */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Validate TX. ================ */

    /* ============================================ */
    /* ============================================ *


    /* ============================================ */
    /* ================ Unlock ==================== */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* ============== Verify Unlock. ============== */

    /* ============================================ */
    /* ============================================ */


    /* ============================================ */
    /* =============== Save TX Info =============== */

    /* ============================================ */
    /* ============================================ */

    

}


function write(item, toFile) {
  if (item && toFile) {
    var newItem = item;
    var newfile = toFile;
    fs.writeFile(newfile, newItem, function(err){
      if (err) throw err;
      console.log("Item Written to file");
    });
  } else { console.console.log("entries must not be empty"); }
}
