#!/usr/bin/env node
var figlet = require("figlet");
var colors = require("colors");
var vorpal = require('vorpal')();

vorpal
  .use(require('./ark-lock-pi.js'))
  .use(require('./services/lock.js'))
  .show();

vorpal.history('ark-lock');

vorpal.log(colors.cyan(figlet.textSync("|||||||||||||||||||||||||||||", "digital")));
vorpal.log(colors.cyan(figlet.textSync("|| Ark-Lock-Pi ||", "cybermedium")));
vorpal.log(colors.cyan(figlet.textSync("|||||||| sleepdefIoT ||||||||", "digital")));

vorpal
  .delimiter('ark-lockPi>')
  .show();
