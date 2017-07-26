var events = require('events');

module.exports = {

    // rpio.open(00, rpio.INPUT, rpio.PULL_DOWN);
    // rpio.poll(1, buttonPush);
    // function buttonPush(pin){
    // 	// var state = rpio.read(pin) ? 'pressed' : 'notPressed';
    // 	// if (state == 'pressed') {
    // 		// makeTX
    //     nfcData.emit('dataNeedsMade');
    // 	// }
    // }

// }


  buttonWasPushed: function buttonWasPushed() {
    console.log('**** buttonWasPushed ****');
    console.log("Getting ready to make TX Requests...\n");

    // if data was presented & scanned
    var dataNeedsMade = require('./tx.js').dataNeedsMade;
    dataNeedsMade();
  },

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ================== Unlock ================== */
  // do unlock on pins
  //rpio.open(02, rpio.INPUT, rpio.PULL_DOWN);

  shouldUnlock: function shouldUnlock() {
    console.log('**** shouldUnlock ****');
    console.log('Unlocking...\n');

    console.log('********** Unlocked **********\n');


    //if was unlocked
    // unlocked.on('wasUnlocked', wasUnlocked);
    // unlocked.emit('wasUnlocked');
  },

  /* ============================================ */
  /* ============================================ */


  /* ============================================ */
  /* ============== Verify Unlock. ============== */
  // check if unlock was successful on pins

  wasUnlocked: function wasUnlocked() {
    console.log('**** wasUnlocked ****');
    console.log('Verifying...\n');

    // if unlock was verified
    saveTX.on('shouldSaveTX', shouldSaveTX);
    saveTX.emit('shouldSaveTX');
  }

  /* ============================================ */
  /* ============================================ */

}
