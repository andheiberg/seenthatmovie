// Meteor.publish('movies', function(seen, limit) {
// 	return Movies.find({seen: seen}, {limit: limit});
// });

// Meteor.publish('unmarkedMovies', function(limit) {
// 	var markedMovies = Views.find({userId: this.userId});
// 	markedMovies = markedMovies.map(function(movie) {
// 		return movie._id
// 	});
// 	return Movies.find({id: {$nin: markedMovies}}, {limit: limit});
// });

// Meteor.publish('seenMovies', function(limit) {
// 	var seenMovies = Views.find({userId: this.userId, seen: true});
// 	seenMovies = seenMovies.map(function(movie) {
// 		return movie._id
// 	});
// 	return Movies.find({id: {$in: seenMovies}}, {limit: limit});
// });

// Meteor.publish('unseenMovies', function(limit) {
// 	var seenMovies = Views.find({userId: this.userId, seen: true});
// 	seenMovies = seenMovies.map(function(movie) {
// 		return movie._id
// 	});
// 	return Movies.find({id: {$nin: seenMovies}}, {limit: limit});
// });
// 
Meteor.publish('movies', function(limit) {
	return Movies.find({}, {sort: {popularity: -1}, limit: limit});
});

Meteor.publish('views', function() {
	return Views.find({userId: this.userId});
});

// 85000 current max
_.each(TMDB.fetchMovieIdRange(2000, 2000), function(value, key, list) {
	var movie = Movies.findOne({id: value.id});
	if (!movie) {
		Movies.insert(value);
		console.log('new');
	}
	else {
		console.log('exists')
	}
});