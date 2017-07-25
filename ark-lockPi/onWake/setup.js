#!/usr/bin/env node
var vorpal = require('vorpal')();

vorpal
  .use(require('../ark-lock-pi.js'))
  .show();

  var setup = function() {
    vorpal.exec('lock setup');
    vorpal.exec('exit');
  };

setup();
