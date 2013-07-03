// define dependencies
require.config({
	paths: {
        jquery: [
             '//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
             // If the CDN location fails, load from this location
             'lib/jquery/jquery-2.0.2.min'
        ],
        
        tweenMax: [
             '//cdnjs.cloudflare.com/ajax/libs/gsap/1.9.8/TweenMax.min',
             // If the CDN location fails, load from this location
             'lib/gsap/1.9.8/TweenMax.min'
        ],
    },
    
	shim: {
		'tweenMax': {
			exports: 'TweenMax'
		}
	}
});

require(['jquery', 'app/app'], function($, App) {
	// start app on dom ready
	$(function() {
		//init App
		App.init();
	});
});

require.onError = function( err ) {
	if ( err.requireType === 'timeout' && window.console && window.console.log ) {
		console.log('modules: ' + err.requireModules);
    }

	throw err;
};
