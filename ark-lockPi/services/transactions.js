var request = require('request');
var storage = require('./storage.js');

function findWith(hash) {
    console.log('\n **** transaction.existsWith(hash): Called **** \n ..checking if transaction exists..');
    var address = String(storage.jarAddress());
    verifyTransactionsFor(address, hash);
};

function verifyTransactionsFor(address, hash) {
    request('http://35.188.148.247:4002/api/transactions?recipientId=' + address,  function (error, response, body) {
        if (error || response.statusCode !== 200) {
            console.log('Transaction was not found.. \n');
            waitFor(hash);
        } else {
            checkRequest(body, hash);
        }
    });    
}

function checkRequest(body, hash) {
    console.log('\n Checking Transaction Records.. \n');
    var allTransactionsOfLock = JSON.parse(body).transactions;
    var vendorFields = [];
    var confirmations = [];
    for (var index in allTransactionsOfLock) {                    
        vendorFields.push(allTransactionsOfLock[index].vendorField);
        confirmations.push(allTransactionsOfLock[index].confirmations);
    };
    var indexOfHash = vendorFields.indexOf(hash);
    // var indexOfHash = vendorFields.indexOf("║▌║█║▌  Ѧ  ║▌║▌█");        // testHash     
    if (indexOfHash > -1 && confirmations[indexOfHash] > 3) {\        
        console.log('\n Transaction Found! Starting unlock sequence.. \n');
        wasFound();
    } else {
        console.log('Transaction was not found.. \n ...trying again in 5 seconds. \n'); 
        waitFor(hash);                
    }
}

function waitFor(hash) {
    setTimeout(function() {
      findWith(hash);
  }, 5000);
};

function wasFound() {
    console.log('\n ***transaction.wasFound: Called** \n');
};

module.exports = {
    findWith: findWith
};
