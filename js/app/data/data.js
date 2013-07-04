define([//
'jquery', //
'app/config', //
], function($, Config) {

	var Data = function() {
		var items = [];
		var viewList = [];

		/*------------------------------------------------------*/

		var addItems = function(arr) {
			for ( var i = 0; i < arr.length; i++) {
				if (i < Config.getMaxItems()) {
					items.push(arr[i]);
				}
			}
		}

		var addNewItems = function(arr) {
			if (items.length > 0) {
				for ( var i = 0; i < arr.length; i++) {
					for ( var j = 0; j < items.length; j++) {

						var itemComparer = compare(arr[i].id, items[j].id);

						if (itemComparer == 0) {
							break;
						} else {
							if (itemComparer > 0) {
								console.log("Added new item: " + arr[i].id);
								
								//add new item to items list
								items.splice(j, 0, arr[i]);
								
								//push new items to viewList
								viewList.push(arr[i]);
								
								break;
							}
						}
					}
				}
				
				var itemsAdded = Math.abs(items.length - Config.getMaxItems());
				console.log("Total items added: " + itemsAdded);
				
				//delete out of range
				items.splice(Config.getMaxItems(), Number.MAX_VALUE);
			} else {
				addItems(arr);
			}
		}

		var compare = function(itemA, itemB) {
			if (itemA > itemB) {
				return 1;
			} else if (itemA < itemB) {
				return -1;
			} else {
				return 0;
			}
		}

		/*------------------------------------------------------*/

		var getItems = function() {
			return items;
		}

		/*------------------------------------------------------*/
		// Return
		return {
			addItems : addItems,
			addNewItems : addNewItems,
			getItems : getItems,
		};
	};

	return new Data();
});
