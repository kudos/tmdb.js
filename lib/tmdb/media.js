var sys = require('sys'),
	http = require('http');

var apiHost = 'api.themoviedb.org';
var apiVersion = '2.1';

var media = exports.media = function(apiKey){
	this.apiKey = apiKey;
}

media.prototype.getInfo = function(options, callback){
	var args = Array.prototype.slice.call(arguments, 0);
	callback = args.pop();
	options = args.length ? args.shift() : {};
	if((!options.hash && !options.bytesize) && !options.dvdid){
			throw new Error('either a hash/bytesize pair or dvdid is required.')
	}
	var request = http.createClient(80, apiHost).
		request('GET', '/' + apiVersion + '/Media.getInfo/' + 
			(options.language ? options.language : 'en') + '/json/' + this.apiKey + '/' + 
				(options.dvdid ? options.dvdid : options.hash + '/' + options.bytesize), 
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
				var genres = JSON.parse(chunks);
				callback(error, genres);
			}
			else{
				callback(error, {});
			}
		});
	});
}