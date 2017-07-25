# ark-LockPi

```bash
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| |    ____ ____ _  _    _    ____ ____ _  _    ___  _    | | 
| |    |__| |__/ |_/  __ |    |  | |    |_/  __ |__] |    | | 
| |    |  | |  \ | \_    |___ |__| |___ | \_    |    |    | | 
| |                                                       | | 
 +-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+
 ||||||||||||||||| |s|l|e|e|p|d|e|f|I|o|T| |||||||||||||||||
 +-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+
 ````

## Unofficial Community Member Repo

[https://ark.io](https://ark.io)

# Alpha - Work in progress.

```
TODO:  
  1: encrypt & hide data & functions. Swiss cheese like whoa.
  2: cleanup & expand logic.
  3: format & place vendorField data in TX request.
```



# Get

To clone ONLY ark-lockPi:  
- ```cd``` to the directory you want ark-lockPi in. 
- copy the entire one-line command.
```bash
  git clone --depth 1 https://github.com/sleepdefic1t/ark-IoT.git ark-lockPi && cd ark-lockPi && git filter-branch --prune-empty --subdirectory-filter ark-lockPi HEAD
``` 

# Install
From the ark-lockPi folder:
```bash
  npm install
``` 

# Use 
### Run main-cli: 
```bash
  npm run start
```
#
### Run lock setup: 
##### prompts for Ark Address, LocationID of the Lock, and Price(cost of unlock)
```bash
  npm run setup
``` 
#
### Simulate Button Press
```bash
  npm run pushButton
``` 
#
