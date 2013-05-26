IMDB = (function () {
	var module = {};
	var apiurl = 'http://imdbapi.org/';

	function getUrl(url) {
		return apiurl;
		return [apiurl, url].join('/'); 
	}

	function get(url, params) {
		return call('GET', url, params);
	}

	function post(url, params) {
		return call('POST', url, params);
	}

	function call(method, url, params) {
		//return {url: getUrl(url), params: params};
		var result = Meteor.http.call(method, getUrl(url), {params: params});
		if (result.statusCode === 200)
			return result;
		
		return result.statusCode;
	}

	module.property = 1;
	module.findMovieByTitle = function (title) {
		return get('', {title: title, type: 'json', plot: 'simple', limit: 1, lang: 'en-US', aka: 'simple', release: 'simple'});
	};

	module.findMovieByID = function (id) {
		return get('', {id: id});
	};

	return module;
}());