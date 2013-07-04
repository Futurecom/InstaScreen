define([//
'app/config', //
'app/loader/feedLoader', //
], function( Config, FeedLoader ) {

    var Updater = function( ) {
		
		var checkTimerObj;
		
    	/*------------------------------------------------------*/

    	var start = function()
    	{
    		console.log("Updater.start()");
    		
    		//start check interval for added feed items
    		checkTimerObj = window.setInterval(checkForNewItems, Config.getApiInterval() * 1000);
    	}
    	
    	/*------------------------------------------------------*/

    	var checkForNewItems = function()
    	{
    		console.log("Updater.checkForNewItems()");
    		
    		//load feed items
			FeedLoader.load();
    	}
		
    	/*------------------------------------------------------*/
    	// Return
    	
    	return {
    		start : start
    	};
    };
    
    return new Updater();
});
