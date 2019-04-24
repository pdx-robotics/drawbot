const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // module for web socket.
const port = 3000;
const bodyParser = require('body-parser');

// gpio related variables
const Gpio = require('pigpio').Gpio;
const motor1_pwm = new Gpio(4, {mode: Gpio.OUTPUT});
const motor1_1 = new Gpio(17, {mode: Gpio.OUTPUT});
const motor1_2 = new Gpio(27, {mode: Gpio.OUTPUT});
const motor2_pwm = new Gpio(9, {mode: Gpio.OUTPUT});
const motor2_1 = new Gpio(22, {mode: Gpio.OUTPUT});
const motor2_2 = new Gpio(10, {mode: Gpio.OUTPUT});
const MOTOR1 = 1;
const MOTOR2 = 2;
var lightValue = 0;

var timer;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/test', function(req,res){
  console.log('received object');
  console.log(req.body);
  res.end();
});

app.post('/move', function(req,res){
  console.log('received object');
  console.log(req.body);
  if(req.body.move){
    console.log('huzzah!');
    console.log(req.body.move);
  }
  res.end();
});

io.on('connection', function(socket){
  socket.on('disconnect',function() { 
    setTimeout(function() { 
      motorsOff();
      console.log('lost connection');
    }, 200);
  });
  // gamepad controller
  socket.on('realtime', function(data) {
    if(data.control && data.control.length === 6){
      rawValue1 = parseFloat(data.control[0]);
      rawValue2 = parseFloat(data.control[3]);
      if(rawValue1 > .15 && rawValue1 <= 1){
        lightValue = parseInt( (rawValue1 - .15) * 300 );
        motor1_pwm.pwmWrite(lightValue);
        motor1_1.pwmWrite( parseFloat(data.control[1])*255 );
        motor1_2.pwmWrite( parseFloat(data.control[2])*255 );
      }
      else{
        motor1_pwm.pwmWrite(0);
        motor1_1.pwmWrite(0);
        motor1_2.pwmWrite(0);
      }
      if(rawValue2 > .15 && rawValue2 <= 1){
        lightValue = parseInt( (rawValue2 - .15) * 300 );
        motor2_pwm.pwmWrite(lightValue);
        motor2_1.pwmWrite( parseFloat(data.control[4])*255 );
        motor2_2.pwmWrite( parseFloat(data.control[5])*255 );
      }
      else{
        motor2_pwm.pwmWrite(0);
        motor2_1.pwmWrite(0);
        motor2_2.pwmWrite(0);
      }
    }
  });
  socket.on('light', function(data) {
  });
  // keyboard control
  socket.on('keyboard', function(data) {
    if(data.move === 0){
      keyboardEnabled = true;
      motor1_pwm.pwmWrite(255);
      motor2_pwm.pwmWrite(255);
      motor1_1.pwmWrite(0);
      motor1_2.pwmWrite(255);
      motor2_1.pwmWrite(0);
      motor2_2.pwmWrite(255);
    }
    else if(data.move === 2){
      keyboardEnabled = true;
      motor1_pwm.pwmWrite(255);
      motor2_pwm.pwmWrite(255);
      motor1_1.pwmWrite(255);
      motor1_2.pwmWrite(0);
      motor2_1.pwmWrite(255);
      motor2_2.pwmWrite(0);
    }
    else if(data.move === 1){
      keyboardEnabled = true;
      motor1_pwm.pwmWrite(255);
      motor2_pwm.pwmWrite(255);
      motor1_1.pwmWrite(0);
      motor1_2.pwmWrite(255);
      motor2_1.pwmWrite(255);
      motor2_2.pwmWrite(0);
    }
    else if(data.move === -1){
      keyboardEnabled = true;
      motor1_pwm.pwmWrite(255);
      motor2_pwm.pwmWrite(255);
      motor1_1.pwmWrite(255);
      motor1_2.pwmWrite(0);
      motor2_1.pwmWrite(0);
      motor2_2.pwmWrite(255);
    }
    else
      motorsOff();
    clearTimeout(timer);
    timer = setTimeout( motorsOff, 500);
  });
});

function motorsOff() { 
  motor1_pwm.pwmWrite(0);
  motor2_pwm.pwmWrite(0);
  motor1_1.pwmWrite(0);
  motor1_2.pwmWrite(0);
  motor2_1.pwmWrite(0);
  motor2_2.pwmWrite(0);
}

app.use(express.static('public'));

server.listen(port, () => console.log('Drawbot listening on port ' + port));
