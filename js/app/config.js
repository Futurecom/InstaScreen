/**
 * Copyright (c) 2013 Futurecom interactive All Rights Reserved.
 * 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
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
define([ //
//
], function()
{

	var Config = function()
	{
		/*
		 * insert the required access token. you can get a valid access token
		 * here: http://futurecom.ch/instascreen or here:
		 * http://instagram.com/developer/authentication
		 */
//		var accessToken = "515660266.953c6f7.5d365e1c60a14f67938fcc3577a0fad9";
		var accessToken = "414294402.953c6f7.cde2dd40e16b4bafa48812d3abea429e";

		/*-------------------------*/

		/*
		 * insert the instagram api url here.
		 * for example: https://api.instagram.com/v1
		 */
		var apiURL = "https://api.instagram.com/v1";

		/*
		 * array of api calls
		 */
		//var apiCalls = "bla.json";
		
		var apiCalls = [
		     {
		    	 "apiEndpoint": "/tags/yrgroup/media/recent",
		    	 "maxTagNumber": -1,
		    	 "filterTags": [],
		    	 "blacklistTags": [],
		    	 "geoFenceFilters": []
			 },
		     {
		    	 "apiEndpoint": "/tags/youngrubicam/media/recent",
		         "maxTagNumber": -1,
		         "filterTags": [],
		         "blacklistTags": [],
		         "geoFenceFilters": []
		     },
		     {
		    	 "apiEndpoint": "/tags/youngandrubicam/media/recent",
		         "maxTagNumber": -1,
		         "filterTags": [],
		         "blacklistTags": [],
		         "geoFenceFilters": []
		     },
		     {
		    	 "apiEndpoint": "/tags/wunderman/media/recent",
		         "maxTagNumber": -1,
		         "filterTags": [],
		         "blacklistTags": [],
		         "geoFenceFilters": []
		     }
		];
		
		/*-------------------------*/

		/*
		 * max number of items to display before it loops
		 */
		var maxItems = 100;

		/*
		 * display time for items in seconds.
		 * videos ignore the display time if they are longer
		 */
		var animationInterval = 3;

		/*
		 * interval time for api calls in seconds
		 */
		var apiInterval = 30;

		/*-------------------------*/

		/*
		 * use priority for new images. (display new images asap) default: true
		 */
		/* NOT YET IMPLEMENTED */
		var prioritizeNewItems = true;

		/*-------------------------*/

		/*
		 * mute sounds from videos default: false
		 */
		var muteSound = false;
		
		/*------------------------------------------------------*/

		var getAccessToken = function()
		{
			return accessToken;
		};

		var getApiURL = function()
		{
			return apiURL;
		};

		var getApiCalls = function()
		{
			return apiCalls;
		};

		/*------------------------------------------------------*/

		var getMaxItems = function()
		{
			return maxItems;
		};

		var getAnimationInterval = function()
		{
			return animationInterval;
		};

		/*------------------------------------------------------*/

		var getApiInterval = function()
		{
			return apiInterval;
		};

		/*------------------------------------------------------*/

		var getPrioritizeNewItems = function()
		{
			return prioritizeNewItems;
		};

		/*------------------------------------------------------*/

		var getMuteSound = function()
		{
			return muteSound;
		};

		/*------------------------------------------------------*/
		// Return
		return {
			getAccessToken : getAccessToken,
			getApiURL : getApiURL,
			getApiCalls : getApiCalls,
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
