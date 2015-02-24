requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'app': '../app',
        'bootstrap': 'bootstrap.min',
        'jquery': 'jquery-1.11.2.min',
        'knockout': 'knockout-3.3.0',
        'knockout-mapping': 'knockout.mapping-2.4.1'
    }
});

require(['jquery'], function($) {
	require(['bootstrap'], function(bootstrap) {});
});