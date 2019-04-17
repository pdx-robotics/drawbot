const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // module for web socket.
const port = 3000;
const bodyParser = require('body-parser');

// gpio related variables
const Gpio = require('pigpio').Gpio;
const motor1_pwm = new Gpio(4, {mode: Gpio.OUTPUT});
const motor1_1 = new Gpio(5, {mode: Gpio.OUTPUT});
const motor1_2 = new Gpio(6, {mode: Gpio.OUTPUT});
const motor2_pwm = new Gpio(7, {mode: Gpio.OUTPUT});
const motor2_1 = new Gpio(8, {mode: Gpio.OUTPUT});
const motor2_2 = new Gpio(9, {mode: Gpio.OUTPUT});
const MOTOR1 = 1;
const MOTOR2 = 2;
var lightValue = 0;

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

io.on('connection', function(socket){
  socket.on('realtime', function(data) {
    if(data.control && data.control.length === 6){
      rawValue1 = parseFloat(data.control[0]);
      rawValue2 = parseFloat(data.control[3]);
      if(rawValue1 > .15 && rawValue <= 1){
        lightValue = parseInt( (rawValue1 - .15) * 300 );
        motor1_pwm.pwmWrite(lightValue);
        motor1_1.pwm.pwmWrite( parseFloat(data.control[1])*255 );
        motor1_2.pwm.pwmWrite( parseFloat(data.control[2])*255 );
      }
      else{
        motor1_pwm.pwmWrite(0);
        motor1_1.pwm.pwmWrite(0);
        motor1_2.pwm.pwmWrite(0);
      }
      if(rawValue2 > .15 && rawValue <= 1){
        lightValue = parseInt( (rawValue2 - .15) * 300 );
        motor1_pwm.pwmWrite(lightValue);
        motor2_1.pwm.pwmWrite( parseFloat(data.control[4])*255 );
        motor2_2.pwm.pwmWrite( parseFloat(data.control[5])*255 );
      }
      else{
        motor1_pwm.pwmWrite(0);
        motor2_1.pwm.pwmWrite(0);
        motor2_2.pwm.pwmWrite(0);
      }
    }
  });
  socket.on('light', function(data) {
  });
});

app.use(express.static('public'));

server.listen(port, () => console.log('Drawbot listening on port ' + port));
