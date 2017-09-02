# ark-LockPi

```bash
║▋▎▋▎▋║▉▋║   Ѧ   ▋║▎█ ▋▎▋║║
║█║ ark-lock-pi | 0.3.0 ║█║
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

# Parts Used

- **Mainboard**: 
  -  [**Raspberry Pi Zero W**](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)

- **NFC**: 
  -  [**DFRobot NFC Module**](https://www.dfrobot.com/product-892.html) by [DFRobot](https://dfrobot.com/)
     - [DFRobots' NFC Module Wiki Page](https://www.dfrobot.com/wiki/index.php/NFC_Module_for_Arduino_(SKU:DFR0231))

- **Prototyping**:
  -  [**Zebra Zero Plus Breadboard**](https://c4labs.net/products/zebra-zero-plus-for-raspberry-pi-zero-wood-1) by [**C4Labs**](https://c4labs.net)

- **Tools**:
  -  Micro USB power supply.
     - Your choice 5v  >=500mAh.
     - 5v  >=1Ah(1,000mAh) Recommended.
       - [**NOTE: Don't use cheap power supplies**](https://www.google.com/search?q=dangers+of+cheap+usb+power+supplies).
  -  Micro-USB Cable for headless/SSH setup
  -  Soldering Station or Kit

- **Misc**:
  -  [**2x20 Female GPIO Header**](https://www.adafruit.com/product/2222)


# Requirements 

- [Git](https://git-scm.com/downloads) | [@git](https://github.com/git/) 
  
- [nodejs/npm](https://nodejs.org/en/download/) | [@nodejs](https://github.com/nodejs/) 
  
  

# Get

Experimental: "Front Door Delivery"
- Clones, Installs, and Launches.
```bash
git clone --depth 1 https://github.com/sleepdefic1t/ark-IoT.git ark-lockPi && cd ark-lockPi && git filter-branch --prune-empty --subdirectory-filter ark-lockPi HEAD && npm install && npm run start
```
#

To download ark-lockPi:  
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
