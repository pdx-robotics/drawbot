const express = require('express');
const app = express();
//const server = require('http').Server(app);
//const io = require('socket.io')(server); // module for web socket.
const port = 3000;
const bodyParser = require('body-parser');

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

/*
io.sockets.on('connection', function(socket){
  var lightValue = 0;
  socket.on('light', function(data) {
    lightValue = data
    if(lightValue)
      console.log(lightValue);
  });
});
*/
app.use(express.static('public'));

app.listen(port, () => console.log(`Drawbot listening on port ${port}!`));
