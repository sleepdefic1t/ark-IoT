var request = require('request');

function isConnectable() {
    var connected;
    request('http://35.188.148.247:4002/api/peers', function (error, response) {
        switch ((error || response.statusCode !== 200) === true) {
            case false: return true;
            default: return false;
        };
      });
    return Boolean([connected]);
};

module.exports = {
    isConnectable: isConnectable,
};
