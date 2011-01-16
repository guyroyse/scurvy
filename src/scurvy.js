var http = require('http');
var fs = require('fs');
var url = require('url');

var routes = [];

var findMatchingRoutes = function(request, response) {
	return routes.some(function(route) {
		if (request.url === route.matcher) {
			route.func(request, response);
			return true;
		}
		return false;
	});
};

var write404 = function(request, response) {
	fs.readFile('404.html', function (err, data) {
		if (err) {			
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end(text404);
		} else {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end(data);
		}
	});
	console.log(' - Not Found!');
};

var text404 = 
	"<html>" +
	"<head>" +
	"<link href='http://fonts.googleapis.com/css?family=Irish+Growler' rel='stylesheet' type='text/css'>" + 
	"<style type='text/css'>" +
	"body {" +
	"	text-align:center;" +
	"	font-family:'Irish Growler',arial,serif;" +
	"	color:beige;" +
	"	background-color:black;" +
	"	margin: 20px" +
	"}" +
	".header {" +
	"	margin-top:100px;" +
	"	font-size:48px;" +
	"}" +
	".jollyroger{" +
	"	font-size:192px;" +
	"}" +
	".subtitle{" +
	"	font-size:24px;" +
	"}" +
	"</style>" +
	"</head>" + 
	"<body>" +
	"<div class='header'> Arrrrrrr!</div>" +
	"<div class='jollyroger'>&#9760;</div>" +
	"<div class='subtitle'>Walk the plank!<br/>That request be not found, matey!</div>" +
	"</body>" +
	"</html>"

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

exports.createServer = function () {
	console.log("Arrrr! There be a scurvy server startin'."); 
	return http.createServer(function(request, response) {
		console.log(request.method + ' ' + request.url); 
		if (!findMatchingRoutes(request, response)) {
			findMatchingFiles(request, response);
		}
	});
};

exports.get = function (match, fn) {
	routes.push({
		verb: 'GET',
		matcher: match,
		func: fn
	});
};