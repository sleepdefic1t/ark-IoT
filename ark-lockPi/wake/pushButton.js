var vorpal = require('vorpal')();

vorpal
  .use(require('../ark-lock-pi.js'))
  .show();

var pushButton = function() {
  vorpal.exec('lock buttonPush');
  vorpal.exec('exit');
};

pushButton();
