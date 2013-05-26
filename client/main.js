// seenMoviesHandle = Meteor.subscribeWithPagination('seenMovies', 10);
// unseenMoviesHandle = Meteor.subscribeWithPagination('unseenMovies', 10);
// unmarkedMoviesHandle = Meteor.subscribeWithPagination('unmarkedMovies', 10);

moviesHandle = Meteor.subscribeWithPagination('movies', 40);
Meteor.subscribe('views');