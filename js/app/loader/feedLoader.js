define([//
'jquery', //
'app/config', //
], function( $, Config ) {

    var FeedLoader = function()
    {
    	var callback;
		var arrItems = [];
		
    	var load = function(cb)
    	{
    		callback = cb;
    		loadFeedData();
    	}
    	
    	/*------------------------------------------------------*/

    	var loadFeedData = function( url ) {
			
			var apiUrl = (url != undefined) ? url : Config.getApiURL();
			console.log(apiUrl);
					
			$.ajax({
				url: apiUrl,
				data: {
					access_token : Config.getAccessToken(),
					count : 30
				},
				type: 'GET',
				dataType: 'jsonp',
				success: onFeedDataLoaded
			});
		}
		
		var onFeedDataLoaded = function(json) {
			
			if(json && json.meta.code == 200)
			{
				data = json.data;
				
				for(var i=0; i<data.length; i++)
				{
					if(arrItems.length < Config.getMaxItems())
					{
						arrItems.push(data[i]);
					}
					else
					{
						break;
					}
				}
				
				console.log(arrItems.length);
				
				if(arrItems.length < Config.getMaxItems())
				{
					loadFeedData(json.pagination.next_url);
				}
				else
				{
					callback();
				}
			}else{
				loadFeedData();
			}
		}

		/*------------------------------------------------------*/
		
		var getArrItems = function() {
			return arrItems;
		};
		
    	/*------------------------------------------------------*/
    	// Return
    	
    	return {
    		load : load,
    		getArrItems : getArrItems
    	};
    };
    
    return new FeedLoader();
});
