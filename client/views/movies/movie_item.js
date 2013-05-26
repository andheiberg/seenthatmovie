Template.movieItem.helpers({
	seen: function() {
		var userId = Meteor.userId();
		var view = Views.findOne({userId: userId, movieId: this._id});

		if (typeof(view) != "undefined" && view.seen) {
			return "Yeah you've seen it";
		}
		else if (typeof(view) != "undefined" && !view.seen) {
			return "Not seen";
		}

		return "Not marked";
	},
	url: function() {
		return 'http://www.themoviedb.org/movie/' + this.id;
	}
});

Template.movieItem.events({
	'click': function(event) {
		this.clicks = this.clicks ? this.clicks + 1 : 1;
	},
	'mouseleave .movie': function(event, template) {
		if (this.clicks && this.clicks % 2 != 0) {
			Meteor.call('toggleViewStatus', this._id, function(error, result) {
				error && throwError(error.reason);
			});
		}
	}
});