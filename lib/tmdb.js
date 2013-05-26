TMDB = (function () {
	var module = {};
	var apiurl = 'http://api.themoviedb.org/3';
	var apikey = 'd7cad135f6d56795d07e02f40980e861';
	var imagebaseurl = 'http://cf2.imgobject.com/t/p/w500';

	function getUrl(url) {
		return [apiurl, url].join('/'); 
	}

	function get(url, params) {
		var keyparam = {api_key: apikey};
		params = _.extend(keyparam, params);

		return call('GET', url, params);
	}

	function post(url, params) {
		var keyparam = {api_key: apikey};
		params = _.extend(keyparam, params);

		return call('POST', url, params);
	}

	function call(method, url, params) {
		try {
			var result = Meteor.http.call(method, getUrl(url), {params: params, headers: {accept: "application/json"}});
			if (result.statusCode === 200) {
				return result;
			}
		}
		catch(error) {
			return error;
		}
	}

	function correctImageUrls(movies) {
		if (_.isArray(movies)) {
			console.log('array');
			_.each(movies, function(value, key, list) {
				_.each(value, function(value, key, list) {
					if (key == 'poster_path' || key == 'backdrop_path') {
						list[key] = imagebaseurl + value;
					}
				});

				list[key] = value;
			});
		}
		else {
			_.each(movies, function(value, key, list) {
				if (key == 'poster_path' || key == 'backdrop_path') {
					list[key] = imagebaseurl + value;
				}
			});
		}

		return movies;
	}

	module.property = 1;
	module.findMovieByTitle = function(title) {
		var page = get('search/movie', {query: title});
		return module.findMovieByID(page.data.results[0].id);
	};

	module.findMovieByID = function(id) {
		var movie = get('movie/' + id).data;
		movie = correctImageUrls(movie);
		return movie;
	};

	module.latestMovie = function() {
		return get('movie/latest').data;
	};

	module.upcomingMovies = function() {
		var movies = get('movie/upcoming').data.results;
		movies = correctImageUrls(movies);
		return movies;
	};

	module.fetchMovieIdRange = function(start, stop) {
		var movies = [];
		for (var i = start; i <= stop; i++) {
			var result = module.findMovieByID(i);
			if (result && result.poster_path != "http://cf2.imgobject.com/t/p/w500null") {
				movies.push(result);
			}
		};
		return movies;
	}

	return module;
}());