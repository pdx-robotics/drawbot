const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // module for web socket.
const port = 3000;
const bodyParser = require('body-parser');
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
  socket.on('light', function(data) {
  });
});
app.use(express.static('public'));

server.listen(port, () => console.log('Drawbot listening on port ' + port));
