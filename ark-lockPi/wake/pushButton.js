var vorpal = require('vorpal')();

vorpal
  .use(require('../services/lock.js'))
  .show();

var pushButton = function() {
  vorpal.exec('lock pushButton');
  vorpal.exec('exit');
};

pushButton();
