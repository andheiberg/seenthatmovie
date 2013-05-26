// Meteor.publish('movies', function(seen, limit) {
// 	return Movies.find({seen: seen}, {limit: limit});
// });

Meteor.publish('unmarkedMovies', function(limit) {
	var markedMovies = [];
	Views.find({userId: Meteor.userId}).forEach(function(view) {
		markedMovies.push( view.movieId );
	});

	return Movies.find({_id: {$nin: markedMovies}}, {sort: {popularity: -1}, limit: limit});
});

Meteor.publish('seenMovies', function(limit) {
	var seenMovies = [];
	Views.find({ userId: Meteor.userId, seen: true }).forEach(function(view) {
		seenMovies.push( view.movieId );
	});

	return Movies.find({_id: {$in: seenMovies}}, {sort: {popularity: -1}, limit: limit});
});

Meteor.publish('unseenMovies', function(limit) {
	var unseenMovies = [];
	Views.find({ userId: Meteor.userId, seen: false }).forEach(function(view) {
		unseenMovies.push( view.movieId );
	});

	return Movies.find({_id: {$in: unseenMovies}}, {sort: {popularity: -1}, limit: limit});
});

Meteor.publish('movies', function(limit) {
	return Movies.find({}, {sort: {popularity: -1}, limit: limit});
});

Meteor.publish('views', function() {
	return Views.find({userId: this.userId});
});

// 85000 current max
// _.each(TMDB.fetchMovieIdRange(2000, 2000), function(value, key, list) {
// 	var movie = Movies.findOne({id: value.id});
// 	if (!movie) {
// 		Movies.insert(value);
// 		console.log('new');
// 	}
// 	else {
// 		console.log('exists')
// 	}
// });