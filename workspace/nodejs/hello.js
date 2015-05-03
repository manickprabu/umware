var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.end('Hello World\n');
  //console.log('Hello World 123');

  var foo = {bar: 'foobar'};
console.log(foo);

}).listen(1337, '127.0.0.1');