Movies = new Meteor.Collection('movies');

Meteor.methods({
	findMovieByTitle: function(title) {
		return TMDB.findMovieByTitle(title);
	},
	findMovieByID: function(id) {
		return TMDB.findMovieByID(id);
	},
	latestMovie: function() {
		return TMDB.latestMovie();
	},
	upcomingMovies: function() {
		return TMDB.upcomingMovies();
	},
	fetchMovieIdRange: function(start, stop) {
		return TMDB.fetchMovieIdRange(start, stop);
	},
	toggleViewStatus: function(movieId) {
		var user = Meteor.user();

		if (!user) {
			throw new Meteor.Error(401, "You need to login to mark movies as seen");
		}

		var view = Views.findOne({movieId: movieId, userId: user._id});

		if (typeof(view) == "undefined") {
			Views.insert({
				movieId: movieId,
				userId: user._id,
				seen: true
			});
		}
		else {
			Views.update({movieId: movieId, userId: user._id}, {$set: {seen: !view.seen}});
		}
	}
});