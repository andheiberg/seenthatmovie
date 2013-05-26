Template.movieItem.helpers({
	// ownJob: function() {
	// 	return this.userId == Meteor.userId();
	// },
	// domain: function() {
	// 	var a = document.createElement('a');
	// 	a.href = this.url;
	// 	return a.hostname;
	// },
	// upvotedClass: function() {
	// 	var userId = Meteor.userId();
	// 	if (userId && !_.include(this.upvoters, userId)) {
	// 		return 'btn-primary upvoteable';
	// 	} else {
	// 		return 'disabled';
	// 	}
	// }
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
		console.log('clicked');
		Meteor.call('toggleViewStatus', this._id);
	}
});