# drawbot

Drawbot will be using the raspberry pi to control an mbot to draw doodles. 

You can try a demo of the app [here](http://homeolson.ddns.net)

## Architecture

Drawbot will use a raspberry pi running nodejs providing a web application to draw with and control the mbot. The raspberry pi will control the mbot by communicating to the arduino onboard. 

Using mbot to draw on grid patterns 

mbot velocity at motorspeed of 100: 5.5 inches per second

mbot one inch increment : 192ms at speed 100

## Installation on Raspberry pi

```
$ git clone https://github.com/pdx-robotics/drawbot.git
$ cd drawbot
$ npm install
$ npm install body-parser
```
