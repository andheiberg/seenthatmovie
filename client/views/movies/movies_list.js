Template.seenMovies.movies = function() {
	console.log('test');
	var list = [];
	Views.find({ userId: Meteor.userId(), seen: true }).forEach(function(view) {
		list.push( Movies.findOne(view.movieId) );
	});
	return list;
};

Template.unseenMovies.movies = function() {
	console.log('test');
	var list = [];
	Views.find({ userId: Meteor.userId(), seen: false }).forEach(function(view) {
		list.push( Movies.findOne(view.movieId) );
	});
	return list;
};

Template.unmarkedMovies.movies = function() {
	console.log('test');
	var list = [];
	Views.find({ userId: Meteor.userId() }).forEach(function(view) {
		list.push( view.movieId );
	});

	return Movies.find({_id: {$nin: list}});
};

Template.moviesList.helpers({
	movies: function() {
		console.log('test');
		return Movies.find({}, {limit: moviesHandle.limit});
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
