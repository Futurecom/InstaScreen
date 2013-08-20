/**
 * Copyright (c) 2013 Futurecom interactive
 * All Rights Reserved.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Contact Information:
 * Futurecom interactive
 * Hardturmstrasse 133
 * Postfach
 * 8037 Zurich
 * 
 * www.futurecom.ch
 * 
 * @author mih
 */
require.config({
	//version for caching scripts
	urlArgs: "bust=v-1-0-1",
	
	paths: {
        jquery: [
             '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
             // If the CDN location fails, load from this location
             'lib/jquery/jquery-2.0.3.min'
        ],
        
        tweenMax: [
             '//cdnjs.cloudflare.com/ajax/libs/gsap/1.10.2/TweenMax.min',
             // If the CDN location fails, load from this location
             'lib/gsap/1.10.2/TweenMax.min'
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
