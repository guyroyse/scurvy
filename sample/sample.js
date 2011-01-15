var scurvy = require('../src/scurvy');

scurvy.get('/hello', function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World!\n');
});

scurvy.get('/hello/es', function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hola Mundo!\n');
});

scurvy.createServer().listen(8124);
