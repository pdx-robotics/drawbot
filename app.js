const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/test', function(req,res){
  console.log('received object');
  console.log(req.body);
  res.end();
});

app.use(express.static('public'));

app.listen(port, () => console.log(`Drawbot listening on port ${port}!`));
