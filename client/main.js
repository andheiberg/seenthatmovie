seenMoviesHandle = Meteor.subscribeWithPagination('seenMovies', 40);
unseenMoviesHandle = Meteor.subscribeWithPagination('unseenMovies', 40);
unmarkedMoviesHandle = Meteor.subscribeWithPagination('unmarkedMovies', 40);

moviesHandle = Meteor.subscribeWithPagination('movies', 40);
Meteor.subscribe('views');