define([//
'jquery', //
'app/config', //
], function($, Config) {

	var Data = function() {
		var items = [];
		var newItems = [];

		var itemCounter = 0;
		
		/*------------------------------------------------------*/

		var addItems = function(arr) {
			for ( var i = 0; i < arr.length; i++) {
				if (i < Config.getMaxItems()) {
					items.push(arr[i]);
				}
			}
			
			console.log("adding items");
			items.sort(compareItems);
		}

		var addNewItems = function(arr) {
			if (items.length > 0) {
				for ( var i = 0; i < arr.length; i++) {
					for ( var j = 0; j < items.length; j++) {

						var itemComparer = compareItems(arr[i], items[j]);

						if (itemComparer == 0) {
							break;
						} else {
							if (itemComparer > 0) {
								console.log("adding new item: pos: " + j + " id: " + arr[i].id );
								
								//add new item to items
								items.splice(j, 0, arr[i]);
								
								//push new items to newItems
								newItems.push(arr[i]);
								
								break;
							}
						}
					}
				}
				
				var itemsAdded = Math.abs(items.length - Config.getMaxItems());
				console.log("Total items added: " + itemsAdded);
				
				//update counter
				itemCounter += itemsAdded;
				
				//delete out of range elements
				items.splice(Config.getMaxItems(), Number.MAX_VALUE);
			} else {
				addItems(arr);
			}
		}

		/*------------------------------------------------------*/

		var compareItems = function(itemA, itemB) {
			if (itemA.id > itemB.id)
				return 1;
			
			if (itemA.id < itemB.id)
				return -1;
			
			return 0;
		}

		/*------------------------------------------------------*/
		
		var removeNewItems = function() {
			newItems = [];
		}

		/*------------------------------------------------------*/

		var getItems = function() {
			return items;
		}
		
		var getNewItems = function() {
			return newItems;
		}
		
		/*------------------------------------------------------*/
		// Return
		return {
			addItems : addItems,
			addNewItems : addNewItems,
			removeNewItems : removeNewItems,
			//getter
			getItems : getItems,
			getNewItems : getNewItems
		};
	};

	return new Data();
});
