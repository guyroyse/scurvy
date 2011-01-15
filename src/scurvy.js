var http = require('http');
var fs = require('fs');
var url = require('url');

var routes = [];

var findMatchingRoutes = function(request, response) {
	for (var i = 0; i < routes.length; i++) {
		var route = routes[i];
		if (request.url === route.matcher) {
			route.func(request, response);
			return true;
		}
	}
	return false;
};

var findMatchingFiles = function(request, response) {
	var path = url.parse(request.url).pathname;
	fs.readFile('public' + path, function (err, data) {
		if (err) { 
			write404(request, response);
		} else {
			response.writeHead(200);
			response.end(data);
		} 
	});
};


var write404 = function(request, response) {
	fs.readFile('404.html', function (err, data) { 
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(data);
	});
	console.log(' - Not Found!');
};

exports.createServer = function () {
	console.log("Arrrr! There be a scurvy server startin'."); 
	return http.createServer(function(request, response) {
		console.log(request.method + ' ' + request.url); 
		if (findMatchingRoutes(request, response)) return;
		findMatchingFiles(request, response);
	});
};

exports.get = function (match, fn) {
	routes.push({
		verb: 'GET',
		matcher: match,
		func: fn
	});
};