Template.seenMovies.helpers({
	options: function() {
		var seenMovies = [];
		Views.find({ seen: true }).forEach(function(view) {
			seenMovies.push( view.movieId );
		});
 
		return {
			find: {_id: {$in: seenMovies}},
			//sort: {popularity: -1},
			handle: moviesHandle
		}
	}
});
 
Template.unseenMovies.helpers({
	options: function() {
		var unseenMovies = [];
		Views.find({ seen: false }).forEach(function(view) {
			unseenMovies.push( view.movieId );
		});
 
		return {
			find: {_id: {$in: unseenMovies}},
			//sort: {popularity: -1},
			handle: moviesHandle
		}
	}
});
 
Template.unmarkedMovies.helpers({
	options: function() {
		var markedMovies = [];
		Views.find().forEach(function(view) {
			markedMovies.push( view.movieId );
		});
 
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
		this.handle.loadNextPage();
	}
});
