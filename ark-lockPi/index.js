#!/usr/bin/env node

var vorpal = require('vorpal')();

vorpal
  .use(require('./services/main.js'))
  .show();

vorpal.history('ark-lockPi');

console.log("");
console.log('║▋▎║▋▎▋║▉║▋║ Ѧ ║▋║▎█║ ▋▎▋║║');
console.log('║█║ ark-lock-pi | 0.3.0 ║█║');
console.log("");

vorpal
  .delimiter('ark-lockPi>')
  .show();
  
