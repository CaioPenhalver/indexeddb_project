var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public'));
app.listen(3000, function() { 
  console.log('Servidor na port 3000'); 
  console.log(__dirname + '/public');
});
