var http = require('http');

var routes = [];

exports.createServer = function () {
	return http.createServer(function(request, response) {
		routes.forEach(function(route) {
			if (request.url === route.matcher) {
				route.func(request, response);
				return;
			}
		});
		response.writeHead(404);
		response.end('Not found!');
	});
};

exports.get = function (match, fn) {
	routes.push({
		verb: 'GET',
		matcher: match,
		func: fn
	});
};