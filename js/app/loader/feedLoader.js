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
'jquery', //
'app/config', //
'app/data/itemData', //
], function($, Config, ItemData) {

	var FeedLoader = function() {
		var arrItems = [];

		var callback;
		var isInitalLoad;

		/*------------------------------------------------------*/

		var loadData = function(cb, initLoad)
		{
			arrItems = [];

			callback = cb;
			isInitalLoad = initLoad;

			loadFeedData(Config.getApiURL());
		}

		var loadNewData = function(minId)
		{
			arrItems = [];
			
			callback = undefined;
			isInitalLoad = false;
			
			loadFeedData(Config.getApiURL(), minId);
		}

		/*------------------------------------------------------*/

		var loadFeedData = function(url, minId)
		{
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

		var onFeedDataLoaded = function(json)
		{
			if (json && json.meta.code == 200) {
				data = json.data;
				
				//TODO check for blacklist items
				

				for ( var i = 0; i < data.length; i++)
				{
					arrItems.push(data[i]);
				}

				if (isInitalLoad)
				{
					if (!jQuery.isEmptyObject(json.pagination) && arrItems.length < Config.getMaxItems())
					{
						loadFeedData(json.pagination.next_url);
					}
					else
					{
						// add items to Data Class
						ItemData.addItems(arrItems);
						if(callback) callback();
					}
				}
				else
				{
					// add new items to Data Class
					ItemData.addNewItems(arrItems);
					if(callback) callback();
				}
			}
			else
			{
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
