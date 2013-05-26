Meteor.Router.add({
	'/': {to: 'unmarkedMovies', as: 'unmarkedMovies'},
	'/seen-movies': {to: 'seenMovies', as: 'seenMovies'},
	'/unseen-movies': {to: 'unseenMovies', as: 'unseenMovies'}

	// '/most-active': 'mostActiveJobs',
	// '/new': 'newJobs',
	
	// '/jobs/:_id': {
	// 	to: 'jobPage', 
	// 	and: function(id) { Session.set('currentJobId', id); }
	// },
	
	// '/jobs/:_id/edit': {
	// 	to: 'jobEdit', 
	// 	and: function(id) { Session.set('currentJobId', id); }    
	// },
	
	// '/submit': 'jobSubmit'
});

Meteor.Router.filters({
	'requireLogin': function(page) {
		if (Meteor.user())
			return page;
		else if (Meteor.loggingIn())
			return 'loading';
		else
			return 'accessDenied';
	},
	'clearErrors': function(page) {
		clearErrors();
		return page;
	}
});

//Meteor.Router.filter('requireLogin', {only: 'jobSubmit'});
Meteor.Router.filter('clearErrors');
