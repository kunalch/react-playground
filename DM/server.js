var express = require('express');
var app = express();

app.get('/', function (req, res) {
   // res.setHeader('Access-Control-Allow-Origin', '*');
   res.send('Hello World1');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})