Template.seenMovies.helpers({
	options: function() {
		var user = Meteor.user();
		var seenMovies = [];

		if (user) {
			seenMovies = Views.find({userId: Meteor.user()._id, seen: true});
			seenMovies = seenMovies.map(function(value, key, list) {
				return value.movieId;
			});
		}

		return {
			find: {_id: {$in: seenMovies}},
			//sort: {popularity: -1},
			handle: moviesHandle
		}
	}
});

Template.unseenMovies.helpers({
	options: function() {
		var user = Meteor.user();
		var unseenMovies = [];

		if (user) {
			unseenMovies = Views.find({userId: Meteor.user()._id, seen: false});
			unseenMovies = unseenMovies.map(function(value, key, list) {
				return value.movieId;
			});
		}

		return {
			find: {_id: {$in: unseenMovies}},
			//sort: {popularity: -1},
			handle: moviesHandle
		}
	}
});

Template.unmarkedMovies.helpers({
	options: function() {
		var user = Meteor.user();
		var markedMovies = [];

		if (user) {
			markedMovies = Views.find({userId: Meteor.user()._id});
			markedMovies = markedMovies.map(function(value, key, list) {
				return value.movieId;
			});
		}

		return {
			find: {_id: {$nin: markedMovies}},
			//sort: {popularity: -1},
			handle: moviesHandle
		}
	}
});

Template.moviesList.helpers({
	movies: function() {
		var options = {sort: this.sort, limit: this.handle.limit()};
		return Movies.find(this.find, options);
	},
	moviesReady: function() {
		return this.handle.ready();
	},
	allMoviesLoaded: function() {
		return this.handle.ready() &&  
		Movies.find().count() < this.handle.loaded();
	}
});

Template.moviesList.events({
	'click .load-more': function(event, template) {
		event.preventDefault();
		var options = {sort: this.sort, limit: this.handle.limit()};
		Movies.find(this.find, options).forEach(function(movie) {
			Meteor.call('toggleViewStatus', movie._id);
			Meteor.call('toggleViewStatus', movie._id);
		});
		this.handle.loadNextPage();
	}
});
