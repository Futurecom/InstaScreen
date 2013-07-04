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

		var load = function(cb, initLoad) {
			arrItems = [];

			callback = cb;
			isInitalLoad = initLoad;

			loadFeedData();
		}

		/*------------------------------------------------------*/

		var loadFeedData = function(url) {

			var apiUrl = (url != undefined) ? url : Config.getApiURL();
			console.log(apiUrl);

			$.ajax({
				url : apiUrl,
				data : {
					access_token : Config.getAccessToken(),
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
			load : load
		};
	};

	return new FeedLoader();
});
