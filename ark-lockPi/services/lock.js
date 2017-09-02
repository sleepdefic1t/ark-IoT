var rpio = require('rpio');

function needsUnlocked() {
    console.log('\n **** lock.unlock: Called **** \n');
    rpio.open(12, rpio.OUTPUT, rpio.LOW);
    rpio.write(12, rpio.HIGH); /* On */
    rpio.msleep(500);          /* Sleep for .5 seconds */
    rpio.write(12, rpio.LOW);  /* Off */
    wasUnlocked();
};

function wasUnlocked() {
    console.log('\n **** lock.wasUnlocked: Called **** \n');
};

module.exports = {
    needsUnlocked: needsUnlocked
};
