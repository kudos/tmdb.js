tmdb.js
=======
A node.js library for the excellent [TMDB API](http://themoviedb.org)

Usage
-----

	var tmdb = require('./tmdb');
	var movie = new tmdb.movie('yourkey');
	movie.search('Tron', {year: '2010'}, function(err, movies){
		console.log(movies);
	});
