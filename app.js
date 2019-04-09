const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const formidable = require('formidable');

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.post('/test', function(req,res){
  console.log('received object');
  console.log(req.body);
  console.log(req.params);
  res.end();
});

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
