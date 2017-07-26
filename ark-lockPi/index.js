#!/usr/bin/env node
var figlet = require("figlet");
var colors = require("colors");
var vorpal = require('vorpal')();

vorpal
  .use(require('./services/lock.js'))
  .use(require('./services/tx.js'))
  .use(require('./services/nfc.js'))
  .show();

vorpal.history('ark-lock');

vorpal.log(colors.cyan(figlet.textSync("|||||||||||||||||||||||||||||", "digital")));
vorpal.log(colors.rainbow(figlet.textSync("|| Ark-Lock-Pi ||", "cybermedium")));
vorpal.log(colors.cyan(figlet.textSync("|||||||| sleepdefIoT ||||||||", "digital")));

vorpal
  .delimiter('ark-lockPi>')
  .show();
