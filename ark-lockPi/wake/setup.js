var vorpal = require('vorpal')();

vorpal
  .use(require('../services/lock.js'))
  .show();

  var setup = function() {
    vorpal.exec('lock setup');
    vorpal.exec('exit');
  };

setup();
