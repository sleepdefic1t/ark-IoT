# ark-IoT
Unofficial Ark-IoT Community Member Repo

# Projects:

## [ark-lockPi](https://github.com/sleepdefic1t/ark-IoT/tree/master/ark-lockPi)
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

#  

## What is Ark?

 - Provides users, developers, and startups with innovative blockchain technologies.  
 - Aims to create an entire ecosystem of linked chains and a virtual spiderweb of endless use-cases  
    via push button clone-able blockchains, and our SmartBridge technology.
 - A highly flexible, adaptable, scalable, and secure platform.
  - Designed for mass adoption that will deliver the services that consumers want, and developers need. ~[source](https://ark.io/)  
 
 
[The ARK's Smartbridge Technology Youtube Video Link](http://www.youtube.com/watch?v=Fb985Ac_gSY "The ARK's Smartbridge Technology")  
[![The ARK's Smartbridge Technology](http://img.youtube.com/vi/Fb985Ac_gSY/0.jpg)](http://www.youtube.com/watch?v=Fb985Ac_gSY "The ARK's Smartbridge Technology")  


[ACES Youtube Video Link](http://www.youtube.com/watch?v=qugC8sQFR40 "ACES") || [ACES REPO](https://github.com/bradyo/aces-app)  
[![ACES](http://img.youtube.com/vi/qugC8sQFR40/0.jpg)](http://www.youtube.com/watch?v=qugC8sQFR40 "ACES")  

 

## Where do I get a Raspberry Pi?  
- [Adafruit](https://www.adafruit.com/raspberrypi)  
- [ThePiHut](https://thepihut.com/)  
- [Canakit](https://www.canakit.com/)  
- [microcenter](http://www.microcenter.com/brand/4294866729/raspberry-pi)  
- [Amazon](https://www.amazon.com/Raspberry-Pi/pages/5811495011)  




## What is a good OS to start with?

- [RASPBIAN STRETCH LITE](https://www.raspberrypi.org/downloads/raspbian/)  
   Minimal image based on Debian Stretch

- [RASPBIAN STRETCH WITH DESKTOP](https://www.raspberrypi.org/downloads/raspbian/)  
   Image with desktop based on Debian Stretch

 


## Setting up your Pi

#### Headless-mode (SSH-only Access)



## [HowToOTGFast](https://gist.github.com/gbaman/975e2db164b3ca2b51ae11e45e8fd40a)  
  Setting up Pi Zero OTG: The quick way (No USB keyboard, mouse, HDMI monitor needed)  
  [..more info](http://blog.gbaman.info/?p=791 "Raspberry Pi Zero – PROGRAMMING OVER USB! Blog Post")  
    
 For this method, alongside your Pi Zero, 
    MicroUSB cable and MicroSD card,  
    only an additional computer is required,  
    which can be running Windows (with [Bonjour](https://support.apple.com/kb/DL999), iTunes or Quicktime installed),  
    Mac OS or Linux (with Avahi Daemon installed, for example Ubuntu has it built in).    

 1. Flash Raspbian Jessie full or Raspbian Jessie Lite [onto the SD card](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).    
   
2. Once Raspbian is flashed, open up the boot partition (in Windows Explorer, Finder etc)   
    and add to the bottom of the ```config.txt``` file ```dtoverlay=dwc2``` on a new line,  
    then save the file.    
   
3. If using a recent release of Jessie (Dec 2016 onwards),  
    then create a new file simply called ```ssh``` in the SD card as well. 
    By default SSH is now disabled so this is required to enable it.  
    **Remember** - Make sure your file doesn't have an extension (like .txt etc)!    
   
4. Finally, open up the ```cmdline.txt```.  
    Be careful with this file, it is very picky with its formatting!  
    Each parameter is seperated by a single space (it does not use newlines).  
    Insert ```modules-load=dwc2,g_ether``` after ```rootwait```.  
    To compare, an edited version of the ```cmdline.txt``` file at the time of writing,  
    can be found [here](http://pastebin.com/WygSaptQ).    
   
5. That's it, eject the SD card from your computer,  
   put it in your Raspberry Pi Zero and connect it via USB to your computer.  
   It will take up to 90s to boot up (shorter on subsequent boots).  
   It should then appear as a USB Ethernet device.  
   You can SSH into it using ```raspberrypi.local``` as the address. 
   

#
#### NodeJS

[node-pi-zero](https://github.com/sdesalas/node-pi-zero)



more coming soon...
