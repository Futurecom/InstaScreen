define([//
'jquery', //
'app/config', //
'app/data/data', //
], function($, Config, Data) {

	var FeedLoader = function() {
		var arrItems = [];

		var callback;
		var isInitalLoad;

		/*------------------------------------------------------*/

		var loadData = function(cb, initLoad) {
			arrItems = [];

			callback = cb;
			isInitalLoad = initLoad;

			loadFeedData(Config.getApiURL());
		}

		var loadNewData = function(minId) {
			arrItems = [];
			
			callback = undefined;
			isInitalLoad = false;
			
			loadFeedData(Config.getApiURL(), minId);
		}

		/*------------------------------------------------------*/

		var loadFeedData = function(url, minId) {

			var apiUrl = (url != undefined) ? url : Config.getApiURL();
			console.log("url: " + apiUrl);
			console.log("id: " + minId);

			$.ajax({
				url : apiUrl,
				data : {
					access_token : Config.getAccessToken(),
					min_id : minId,
					count : 30
				},
				type : 'GET',
				dataType : 'jsonp',
				success : onFeedDataLoaded
			});
		}

		var onFeedDataLoaded = function(json) {
			if (json && json.meta.code == 200) {
				data = json.data;

				for ( var i = 0; i < data.length; i++) {
					arrItems.push(data[i]);
				}

				if (isInitalLoad) {
					if (arrItems.length < Config.getMaxItems()) {
						loadFeedData(json.pagination.next_url);
					} else {
						// add items to Data Class
						Data.addItems(arrItems);
						if(callback) callback();
					}
				}else{
					// add new items to Data Class
					Data.addNewItems(arrItems);
					if(callback) callback();
				}
			} else {
				loadFeedData();
			}
		}

		/*------------------------------------------------------*/
		// Return
		return {
			loadData : loadData,
			loadNewData : loadNewData
		};
	};

	return new FeedLoader();
});
