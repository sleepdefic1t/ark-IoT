// var rpio = require('rpio');

function needsUnlocked() {
    console.log('\n **** lock.needsUnlocked ****');
    console.log('   requesting NDEF Data... \n');    
    nfc.dataWasRequested();  
};

function unlock() {
    console.log('\n **** lock.unlock: Called **** \n');
    /*
    * Set the initial state to low.  The state is set prior to the pin becoming
    * active, so is safe for devices which require a stable setup.
    */
    // rpio.open(12, rpio.OUTPUT, rpio.LOW);

        // /* On for .5 seconds */
        // rpio.write(12, rpio.HIGH);
        // rpio.msleep(500);

        // /* Off */
        // rpio.write(12, rpio.LOW);
        // rpio.msleep(500);
        // wasUnlocked();

};

function wasUnlocked() {
    console.log('\n **** lock.wasUnlocked: Called **** \n');


};

module.exports = {
    needsUnlocked: needsUnlocked
};
