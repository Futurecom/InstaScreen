define([//
//
], function( ) {
	
	var Config = function(){
		/*
		 * insert the instagram api url here.
		 * https://api.instagram.com/v1/users/self/feed/
		 * http://skolion-services.dev.futurecom.ch/api/instagram/
		*/
		var apiURL = "https://api.instagram.com/v1/users/self/feed/";
	
		/*-------------------------*/
	
		/*
		 * insert the required access token.
		 * you can get a valid access token here: http://instagram.com/developer/authentication
		*/
		var accessToken = "414294402.953c6f7.cde2dd40e16b4bafa48812d3abea429e";
		
		/*------------------------------------------------------*/
		
		var getApiURL = function(){
			return apiURL;
		};
	
		var getAccessToken = function(){
			return accessToken;
		};
			
		/*------------------------------------------------------*/
		// Return
	
		return {
			getApiURL: getApiURL,
			getAccessToken: getAccessToken
		};
	};

	/*------------------------------------------------------*/
	// Return
	
	 return new Config();
});