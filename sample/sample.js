var scurvy = require('../src/scurvy');

scurvy.get('/hello', function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World\n');
});

scurvy.createServer().listen(8124);
