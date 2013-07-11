define([//
'app/config', //
'app/data/data', //
'app/loader/feedLoader', //
], function( Config, Data, FeedLoader ) {

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
			FeedLoader.loadNewData(Data.getNewestId());
    	}
		
    	/*------------------------------------------------------*/
    	// Return
    	
    	return {
    		start : start
    	};
    };
    
    return new Updater();
});
