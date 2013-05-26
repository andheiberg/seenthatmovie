if (Movies.find().count() == 0) {

	_.each(TMDB.fetchMovieIdRange(0, 500), function(value, key, list) {
		var movie = Movies.findOne({id: value.id});
		if (!movie) {
			Movies.insert(value);
			console.log('new');
		}
		else {
			console.log('exists')
		}
	});
}