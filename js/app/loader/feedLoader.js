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
define([ //
'jquery', //
'app/config', //
'app/data/itemData', //
'app/feed/filter', //
], function($, Config, ItemData, Filter)
{
	var FeedLoader = function()
	{
		var arrItems = [];

		var callback;
		var isInitalLoad;

		var callData;
		var callId = 0;
		var maxItems = Config.getMaxItems();

		var apiCallUrl;

		/*------------------------------------------------------*/

		var loadData = function(cb, initLoad)
		{
			callback = cb;
			isInitalLoad = initLoad;
			
			callId = 0;
			maxItems = Math.ceil(Config.getMaxItems() / Config.getApiCalls().length);

			checkForNextFeed();
		};

		var loadNewData = function()
		{
			callback = undefined;
			isInitalLoad = false;
			
			callId = 0;
			maxItems = Config.getMaxItems();

			checkForNextFeed();
		};

		/*------------------------------------------------------*/

		var checkForNextFeed = function()
		{
			console.log(callId + " of " + Config.getApiCalls().length);
			console.log(maxItems);
			
			//check if any apiCalls are left
			if (callId < Config.getApiCalls().length)
			{
				arrItems = [];
				
				callData = Config.getApiCalls()[callId];
				apiCallUrl = Config.getApiURL() + callData.apiEndpoint;
				loadFeedData(apiCallUrl);
			}
			else
			{
				if (callback)
					callback();
			}

			callId += 1;
		};

		/*------------------------------------------------------*/

		var loadFeedData = function(apiUrl)
		{
			console.log("url: " + apiUrl);

			$.ajax({
				url : apiUrl,
				data : {
					access_token : Config.getAccessToken(),
					count : 30
				},
				type : 'GET',
				dataType : 'jsonp',
				success : onFeedDataLoaded,
				error: onFeedDataError
			});
		};

		var onFeedDataLoaded = function(json)
		{
			if (json && json.meta.code == 200)
			{
				data = json.data;

				for ( var i = 0; i < data.length; i++)
				{
					//check for tag limit
					if (Filter.isInTagLimit(callData, data[i]))
					{
						//check for geofence
						if (Filter.isInGeofence(callData, data[i]))
						{
							//check for blacklist items
							if (!Filter.isInBlacklist(callData, data[i]))
							{
								//check for subfilter items
								if (Filter.isInFilterlist(callData, data[i]))
								{
									//console.log(data[i].tags.toString());
									arrItems.push(data[i]);
								}
							}
						}
					}
				}

				console.log("arrItems: " + arrItems.length);

				if (isInitalLoad)
				{
					if (json.pagination.next_url && arrItems.length < maxItems)
					{
						loadFeedData(json.pagination.next_url);
					}
					else
					{
						// add items to Data Class
						ItemData.addItems(arrItems);
						checkForNextFeed();
					}
				}
				else
				{
					// add new items to Data Class
					ItemData.addNewItems(arrItems);
					checkForNextFeed();
				}
			}
			else
			{
				loadFeedData(apiCallUrl);
			}
		};
		
		var onFeedDataError = function(jqXHR)
		{
			console.log("FeedDataError: " + jqXHR.status + " - " + jqXHR.statusText);
			
			window.setTimeout(loadFeedData, 5 * 1000, apiCallUrl);
		};
		
		/*------------------------------------------------------*/
		// Return
		return {
			loadData : loadData,
			loadNewData : loadNewData
		};
	};

	return new FeedLoader();
});
