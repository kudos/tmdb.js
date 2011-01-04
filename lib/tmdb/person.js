var sys = require('sys'),
	http = require('http');

var apiHost = 'api.themoviedb.org';
var apiVersion = '2.1';

var person = exports.person = function(apiKey){
	this.apiKey = apiKey;
}

person.prototype.search = function(name, options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	if(args.length){
		name = args.shift();
	}
	else{
		throw new Error('name is required.')
	}
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Person.search/' + (options.language ? options.language : 'en') + '/json/' + this.apiKey + '/' + escape(name), 
		{'host': apiHost});
	request.end();
	request.on('response', function (response) {
		var error = response.statusCode != 200 && response.statusCode != 302 ? response.statusCode : false;
		var chunks = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			chunks += chunk;
		});
		response.on('end', function () {
			if(!error){
				var actors = JSON.parse(chunks);
				callback(error, actors);
			}
			else{
				callback(error, {});
			}
		});
	});
}

person.prototype.getInfo = function(id, options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	if(args.length){
		id = args.shift();
	}
	else{
		throw new Error('id is required.')
	}
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Person.getInfo/' + (options.language ? options.language : 'en') + '/json/' + this.apiKey + '/' + id, 
		{'host': apiHost});
	request.end();
	request.on('response', function (response) {
		var error = response.statusCode != 200 && response.statusCode != 302 ? response.statusCode : false;
		var chunks = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			chunks += chunk;
		});
		response.on('end', function () {
			if(!error){
				var actor = JSON.parse(chunks);
				callback(error, actor);
			}
			else{
				callback(error, {});
			}
		});
	});
}

person.prototype.getLatest = function(options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Person.getLatest/' + (options.language ? options.language : 'en') + '/json/' + this.apiKey, 
		{'host': apiHost});
	request.end();
	request.on('response', function (response) {
		var error = response.statusCode != 200 && response.statusCode != 302 ? response.statusCode : false;
		var chunks = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			chunks += chunk;
		});
		response.on('end', function () {
			if(!error){
				var actor = JSON.parse(chunks);
				callback(error, actor);
			}
			else{
				callback(error, {});
			}
		});
	});
}

person.prototype.getVersion = function(id, options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	if(args.length){
		id = args.shift();
	}
	else{
		throw new Error('id is required.')
	}
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Person.getVersion/' + (options.language ? options.language : 'en') + '/json/' + this.apiKey + '/' + id, 
		{'host': apiHost});
	request.end();
	request.on('response', function (response) {
		var error = response.statusCode != 200 && response.statusCode != 302 ? response.statusCode : false;
		var chunks = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			chunks += chunk;
		});
		response.on('end', function () {
			if(!error){
				var actor = JSON.parse(chunks);
				callback(error, actor);
			}
			else{
				callback(error, {});
			}
		});
	});
}