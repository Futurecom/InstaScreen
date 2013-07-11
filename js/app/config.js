define([//
//
], function() {

	var Config = function() {
		/*
		 * insert the instagram api url here.
		 * for example: https://api.instagram.com/v1
		 */
		var apiURL = "https://api.instagram.com/v1";

		/*-------------------------*/
		
		/*
		 * insert the instagram api call here.
		 * for example: /users/self/feed
		 */
		var apiCall = "/users/self/feed";

		/*-------------------------*/

		/*
		 * insert the required access token. you can get a valid access token
		 * here: http://instagram.com/developer/authentication
		 */
		var accessToken = "414294402.953c6f7.cde2dd40e16b4bafa48812d3abea429e";

		/*-------------------------*/

		/*
		 * max number of items to display before it loops
		 */
		var maxItems = 150;

		/*-------------------------*/

		/*
		 * display time for items in seconds
		 * videos ignore the display time if they are longer
		 */
		var animationInterval = 6;

		/*-------------------------*/
		
		/*
		 * interval time for api calls in seconds
		 */
		var apiInterval = 30;

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
		// Return
		return {
			getApiURL : getApiURL,
			getAccessToken : getAccessToken,
			getMaxItems : getMaxItems,
			getAnimationInterval : getAnimationInterval,
			getApiInterval : getApiInterval
		};
	};

	/*------------------------------------------------------*/
	// Return
	return new Config();
});
