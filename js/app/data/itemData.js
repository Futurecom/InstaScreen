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
define([//
'jquery', //
'lodash', //
'app/config', //
], function($, _, Config)
{
	var ItemData = function()
	{
		var items = [];
		var newItems = [];

		var itemCounter = 0;

		/*------------------------------------------------------*/

		var addItems = function(arr)
		{
			for ( var i = 0; i < arr.length; i++)
			{
				if (i < Config.getMaxItems())
				{
					items.push(arr[i]);
				}
			}

			// sort items by id
			items.sort(compareItemsById);
		}

		var addNewItems = function(arr)
		{
			if (items.length > 0)
			{
				console.log("arr length: " + arr.length);

				//add new items to items
				items = items.concat(arr);
				
				//sort items
				items.sort(compareItemsById);
				
				
				console.log("items length 1: " + items.length);
				
				// remove duplicates
				items = _.uniq(items, 'id');
				
				console.log("items length 2: " + items.length);
				
				
//				for ( var i = 0; i < items.length; i++)
//				{
//					var duplicateChecker = $.inArray(items[i], arr);
//					
//					console.log("Check for dups: " + duplicateChecker);
//					
//					if( duplicateChecker != -1 )
//					{
//						arr.splice(duplicateChecker, 1);
//					}
//				}

//				console.log("new length: " + arr.length);
//
//				// add new item to items
//				for ( var i = 0; i < arr.length; i++)
//				{
//					console.log("adding new item: " + arr[i].id);
//
//					// add new item to items
//					items.splice(i, 0, arr[i]);
//
//					// push new items to newItems
//					newItems.push(arr[i]);
//				}

//				if (arr.length > 0)
//				{
//					// sort items by id
//					items.sort(compareItemsById);
//				}
//				
//				console.log(newItems);

				var itemsAdded = Math.abs(items.length - Config.getMaxItems());
				console.log("Total items added: " + itemsAdded);

				// update counter
				itemCounter += itemsAdded;

				// delete out of range elements
				items.splice(Config.getMaxItems(), Number.MAX_VALUE);
			}
			else
			{
				addItems(arr);
			}
		}

		/*------------------------------------------------------*/

		var compareItemsById = function(itemA, itemB)
		{
			if (itemA.id > itemB.id)
				return -1;

			if (itemA.id < itemB.id)
				return 1;

			return 0;
		}

		/*------------------------------------------------------*/

		var removeNewItems = function()
		{
			newItems = [];
		}

		/*------------------------------------------------------*/

		var getItems = function()
		{
			return items;
		}

		var getNewItems = function()
		{
			return newItems;
		}

		/*------------------------------------------------------*/
		// Return
		return {
			addItems : addItems,
			addNewItems : addNewItems,
			removeNewItems : removeNewItems,
			// getter
			getItems : getItems,
			getNewItems : getNewItems
		};
	};

	return new ItemData();
});
