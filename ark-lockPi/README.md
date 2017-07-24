# ark-LockPi
## Unofficial Community Member Repo

[https://ark.io](https://ark.io)

# Alpha - Work in progress.

```
TODO:  
  1: encrypt & hide data & functions. Swiss cheese like whoa. Utilize clients Signing function.
  2: cleanup logic.
  3: create vendorField data
```

# Usage

For use with  [Ark-Client](https://github.com/arkecosystem/ark-client).

Get the source for Ark-Client: 
```bash
  git clone https://github.com/arkecosystem/ark-client
``` 

# 

Download ark-lock-pi from this Repo or by command line,  
to the "ark-client" directory you just cloned:
```bash
  cd ark-client
  wget https://github.com/sleepdefic1t/ark-IoT/blob/master/ark-lockPi/ark-lock-pi.js
``` 

# 

Open "index.js" from the "Ark-Client" directory with your favorite code editor,  
and insert this requirement:
```nodejs
vorpal
  .use(require('./ark-lock-pi.js'))
  .show();
```
# 
