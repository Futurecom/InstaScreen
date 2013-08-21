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
define([//
//
], function() {

	var Config = function() {
		/*
		 * insert the instagram api url here.
		 * for example: https://api.instagram.com/v1
		 */
		var apiURL = "https://api.instagram.com/v1";

		/*
		 * insert the instagram api endpoint call here.
		 * list of endpoints can be found here: http://instagram.com/developer/endpoints/
		 * for example: /users/self/feed
		 */
		var apiCall = "/users/self/media/liked";

		/*
		 * insert the required access token. you can get a valid access token
		 * here: http://futurecom.ch/instascreen
		 * or here: http://instagram.com/developer/authentication
		 */
		var accessToken = "515660266.953c6f7.5d365e1c60a14f67938fcc3577a0fad9";

		/*-------------------------*/

		/*
		 * max number of items to display before it loops
		 */
		var maxItems = 100;

		/*
		 * display time for items in seconds
		 * videos ignore the display time if they are longer
		 */
		var animationInterval = 6;

		/*
		 * interval time for api calls in seconds
		 */
		var apiInterval = 30;

		/*-------------------------*/
		
		/*
		 * use priority for new images. (display new images asap)
		 * default: true
		 */
		var prioritizeNewItems = true;
		
		/*-------------------------*/

		/*
		 * mute sounds from videos
		 * default: false
		 */
		var muteSound = false;

		/*-------------------------*/

		/*
		 * array of tags for searching in the api
		 * IMPORTANT: be aware that every tag requires a seperate api call, so use it responsibly
		 * for example: ["starwars", "jedi", "darkforce"]
		 */
		var searchTags = [];

		/*
		 * array of tags for adding the image to the stream 
		 * for example: ["luke", "yoda", "hansolo"]
		 */
		var filterTags = [];

		/*
		 * array of tags to block images from adding to the stream
		 * for example: ["sith", "empire", "vader"]
		 */
		var blacklistTags = [];

		/*
		 * max number of tags
		 * prevents tag spaming/bombing to sort out unrelated pictures
		 */
		var maxTagNumber = 5;

		/*------------------------------------------------------*/

		var getApiURL = function() {
			return (apiURL + apiCall);
		};

		var getAccessToken = function() {
			return accessToken;
		};

		/*------------------------------------------------------*/

		var getMaxItems = function() {
			return maxItems;
		};

		var getAnimationInterval = function() {
			return animationInterval;
		};

		/*------------------------------------------------------*/
		
		var getApiInterval = function() {
			return apiInterval;
		};

		/*------------------------------------------------------*/
		
		var getPrioritizeNewItems = function() {
			return prioritizeNewItems;
		};

		/*------------------------------------------------------*/
		
		var getMuteSound = function() {
			return muteSound;
		};

		/*------------------------------------------------------*/
		// Return
		return {
			getApiURL : getApiURL,
			getAccessToken : getAccessToken,
			getMaxItems : getMaxItems,
			getAnimationInterval : getAnimationInterval,
			getApiInterval : getApiInterval,
			getPrioritizeNewItems : getPrioritizeNewItems,
			getMuteSound : getMuteSound
		};
	};

	/*------------------------------------------------------*/
	// Return
	return new Config();
});
