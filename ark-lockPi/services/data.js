var crypto = require("crypto");
var network = require('./network.js');
var storage = require('./storage.js');

function forNFC() {
    console.log('\n **** data.forNFC: Requested ****');
    var data;
    if (network.isConnectable() === false) { 
        setTimeout(function() {
            forNFC();
        }, 5000);
    } else {
        var data = hashed();
    };
    return data;
};

function hashed() {
    console.log('**** data.hashed: Requested **** \n');
    var currentTime = Date.now();
    var stringJar = storage.stringifiedJar();
    var message = stringJar + ' || time : ' + currentTime;
    var hash = crypto.createHash('sha256').update(new Buffer(message, 'utf8')).digest();
    var hashString = hash.toString('hex')
    storage.addReceipt(message, hashString);
    var hashedData = { message: ";", hash: ";" };
    hashedData.message = message;
    hashedData.hash = hashString;
    return hashedData;
};

module.exports = {
    forNFC: forNFC
};
