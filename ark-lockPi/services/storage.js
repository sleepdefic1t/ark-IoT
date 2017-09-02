var fs = require('fs');

function writeJSON(item, toKey) {
    console.log('\n **** storage.writeJSON: Called **** \n');
    fs.open('tmp/jar.json', 'r', (err) => {
        if(err) throw err;
        fs.readFile('tmp/jar.json', function readFileCallback(err, data) {
            if (err) throw err;
            var newJar = JSON.parse(data, 'utf8', 2);
            switch (true) {
                case (toKey === 'address'):
                    newJar.address = item;
                    break;
                case (toKey === 'lid'):
                    newJar.lid = item;
                    break;
                case (toKey === 'price'):
                    newJar.price = item;
                    break;
                default:
                    break;
            }
            var newestJar = JSON.stringify(newJar, 'utf8', 2);
            fs.writeFile("tmp/jar.json", newestJar, function (err) {
                if (err) throw err;
            });
        });
    });
};

function stringifiedJar() {
    var jar = fs.readFileSync('tmp/jar.json', 'utf8');    
    var parseJar = JSON.parse(jar);
    return JSON.stringify(parseJar, 'utf8')
};

function jarAddress() {
    var jar = fs.readFileSync('tmp/jar.json', 'utf8');    
    var parseJar = JSON.parse(jar);
    return JSON.stringify(parseJar.address);
};

function addReceipt(message, hash) {
    console.log('\n **** storage.addReceipt: Called **** \n');
    console.log('   Saving receipt info..');      
    fs.open('tmp/receipts.dat', 'r', (err) => {
        if(err) throw err;
        fs.readFile('tmp/receipts.dat', function readFileCallback(err, data) {
            if (err) throw err;
            var oldData = data;
            var newMessage = 'message: ' + message + ' | hash: ' + hash;
            var newData = oldData + '\n\n' + newMessage;
            fs.writeFile('tmp/receipts.dat', newData, function (err) {
                if (err) throw err;
            });
        });
    });
    console.log('   Receipt info saved. \n');      
};

module.exports = {
    addReceipt: addReceipt,
    jarAddress: jarAddress,
    stringifiedJar: stringifiedJar,
    writeJSON: writeJSON
}
