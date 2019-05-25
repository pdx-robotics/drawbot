# drawbot

Drawbot will be using the raspberry pi to control a robot to draw doodles. 

You can try a demo of the app [here](http://homeolson.ddns.net)

## Contributions
refer to [link](CONTRIBUTING.md)
## Architecture

Drawbot will use a raspberry pi running nodejs providing a web application to draw with and control a bot. The raspberry pi will control a 2 wheeled bot using the pigpio library. 

## Installation on Raspberry pi

```
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ git clone https://github.com/pdx-robotics/drawbot.git
$ cd drawbot
$ npm install
$ npm install body-parser
```

## Running the Server/App
On the raspberry pi navigate to the drawbot directory and execute the node server as root
```
$ sudo node app.js
```
To connect the raspeberry pi you need your client machine to be on the same network. Open a web browser on the client, enter the ip address of the Raspberry pi, followed by ':' and the port number it's listening on. The web app should run from there.
