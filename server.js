
var http = require("http");

http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});

    response.write("Hello World");

    response.end();

}).listen(8080);