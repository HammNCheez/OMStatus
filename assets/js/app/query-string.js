define([], function() {
	var queryString = window.location.search.substring(1);

	return {queryString: queryString};
});