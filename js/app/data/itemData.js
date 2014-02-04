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
'config', //
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
			//add new items to items
			items = arr.concat(items);
			
			// sort items by id
			items.sort(compareItemsById);
			
			// remove duplicates
			items = _.uniq(items, true, 'id');
			
			// delete out of range elements
			items.splice(Config.getMaxItems(), Number.MAX_VALUE);
		};

		var addNewItems = function(arr)
		{
			if (items.length > 0)
			{
				console.log("arr length: " + arr.length);

				//add new items to items
				items = arr.concat(items);
				
				//sort items
				items.sort(compareItemsById);
				
				// remove duplicates
				items = _.uniq(items, true, 'id');
				
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
		};

		/*------------------------------------------------------*/

		var compareItemsById = function(itemA, itemB)
		{
			if (itemA.id > itemB.id)
				return -1;

			if (itemA.id < itemB.id)
				return 1;

			return 0;
		};

		/*------------------------------------------------------*/

		var removeNewItems = function()
		{
			newItems = [];
		};

		/*------------------------------------------------------*/

		var getItems = function()
		{
			return items;
		};

		var getNewItems = function()
		{
			return newItems;
		};

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
