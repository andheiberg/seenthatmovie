Template.seenMovies.helpers({
	options: function() {
		return {
			//find: {_id: {$in: seenMovies}},
			//sort: {popularity: -1},
			handle: seenMoviesHandle
		}
	}
});
 
Template.unseenMovies.helpers({
	options: function() {
		return {
			//find: {_id: {$in: unseenMovies}},
			//sort: {popularity: -1},
			handle: unseenMoviesHandle
		}
	}
});
 
Template.unmarkedMovies.helpers({
	options: function() {
		return {
			//find: {_id: {$nin: markedMovies}},
			//sort: {popularity: -1},
			handle: unmarkedMoviesHandle
		}
	}
});

Template.moviesList.helpers({
	movies: function() {
		var options = {sort: this.sort, limit: this.handle.limit()};
		return Movies.find({}, options);
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
