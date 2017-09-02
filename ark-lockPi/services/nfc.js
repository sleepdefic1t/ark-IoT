var data = require('./data.js');
var rpio = require('rpio');
var transaction = require('./transaction.js');
var network = require('./network.js');


function dataWasRequested() {
  console.log('\n **** nfc.dataWasRequested ****');
  console.log('   making NDEF Data... \n');    
  if (network.isConnectable() === true) {
    var nfcData = data.forNFC();
    console.log('\n *NDEF Data made. Ready to present* \n');  
    powerOnNFC();
    presentNDEFWith(nfcData);
  };
};

function presentNDEFWith(nfcData) {
  console.log('\n **** nfc.presentNDEFWith|nfcData: Called ****');
  console.log('   presenting NDEF Data via NFC... \n');      
  post(nfcData);
};

function post(nfcData){
  console.log('\n **** nfc.post|nfcData: Called **** \n');
  // if okay, continue
  console.log('\n *NDEF Data was shared... Notifying system..* \n');      
  wasPostedWith(nfcData);
}


function powerOn() {
  console.log('\n **** nfc.powerOn: Called **** \n');
    rpio.open(2, rpio.OUTPUT, rpio.LOW);
    /* On */
    rpio.write(24, rpio.HIGH);
};
function powerOff() {
  console.log('\n **** nfc.powerOff: Called **** \n');  
    /* Off */
    rpio.write(2, rpio.LOW);
    wasUnlocked();
};

function wasPostedWith(nfcData) {    
  console.log('\n **** nfc.wasPostedWith|data ****');
  console.log('   preparing to check for transaction confirmation.. \n');      
  transaction.findWith(nfcData.hash);
};

module.exports = {
  dataWasRequested: dataWasRequested
};
