var sys = require('sys'),
	querystring = require('querystring'),
	http = require('http');

var apiHost = 'api.themoviedb.org';
var apiVersion = '2.1';

var movie = exports.movie = function(apiKey){
	this.apiKey = apiKey;
}

movie.prototype.search = function(title, options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	if(args.length){
		title = args.shift();
	}
	else{
		throw new Error('title is required.')
	}
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Movie.search/' + (options.language ? options.language : 'en') + '/json/' + this.apiKey + '/' + escape(title) + 
			(options['year'] ? '+' + options['year'] : ''), 
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
				var movies = JSON.parse(chunks);
				callback(error, movies);
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.browse = function(options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	if(args.length){
		options = args.shift();
	}
	else{
		throw new Error('there are required options.')
	}
	if(!options.order || !options.order_by){
		throw new Error('order_by and order options are required.')
	}
	query = querystring.stringify(options);
	var request = http.createClient(80, apiHost).request('GET', '/' + apiVersion + '/Movie.browse/'+ 
		(options.language ? options.language : 'en') +'/json/' + this.apiKey + '?' + query, 
		{'host': apiHost});
	request.end();
	console.log(request);
	request.on('response', function (response) {
		var error = response.statusCode != 200 && response.statusCode != 302 ? response.statusCode : false;
		var chunks = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			chunks += chunk;
		});
		response.on('end', function () {
			if(!error && chunks.length > 0){
				var movies = JSON.parse(chunks);
				callback(error, movies);
			}
			else if(chunks.length == 0){
				callback('API server closed connection. Probably bad options.', {});
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.getImages = function(id, options, callback){
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
		request('GET', '/' + apiVersion + '/Movie.getImages/'+ 
			(options.language ? options.language : 'en') +'/json/' + this.apiKey + '/' + id, 
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
				var images = JSON.parse(chunks);
				callback(error, images);
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.getInfo = function(id, options, callback){
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
		request('GET', '/' + apiVersion + '/Movie.getInfo/'+ 
			(options.language ? options.language : 'en') +'/json/' + this.apiKey + '/' + id, 
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
				var movie = JSON.parse(chunks);
				callback(error, movie);
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.getLatest = function(options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Movie.getLatest/'+ 
			(options.language ? options.language : 'en') +'/json/' + this.apiKey, 
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
				var movie = JSON.parse(chunks);
				callback(error, movie);
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.getTranslations = function(id, options, callback){
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
		request('GET', '/' + apiVersion + '/Movie.getTranslations/'+ 
			(options.language ? options.language : 'en') +'/json/' + this.apiKey + '/' + id, 
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
				var movie = JSON.parse(chunks);
				callback(error, movie);
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.getVersion = function(ids, options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	if(args.length){
		id = args.shift();
		id.split(',');
	}
	else{
		throw new Error('id is required.')
	}
	options = args.length ? args.shift() : {};
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Movie.getVersion/'+ 
			(options.language ? options.language : 'en') +'/json/' + this.apiKey + '/' + id, 
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
				var movie = JSON.parse(chunks);
				callback(error, movie);
			}
			else{
				callback(error, {});
			}
		});
	});
}

movie.prototype.imdbLookup = function(id, options, callback){
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
		request('GET', '/' + apiVersion + '/Movie.imdbLookup/'+ 
			(options.language ? options.language : 'en') +'/json/' + this.apiKey + '/' + id, 
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
				var movie = JSON.parse(chunks);
				callback(error, movie);
			}
			else{
				callback(error, {});
			}
		});
	});
}