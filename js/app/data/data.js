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
			
			//sort items by id
			items.sort(compareItemsById);
		}

		var addNewItems = function(arr) {
			if (items.length > 0) {
				
				console.log("old length: " + arr.length);

				//remove duplicates
				for ( var i = 0; i < items.length; i++) {
					for ( var k = 0; k < arr.length; k++) {

						var itemComparer = compareItemsById(items[i], arr[k]);

						if (itemComparer == 0) {
							arr.splice(k,1);
							break;
						}
					}
				}
				
				console.log("new length: " + arr.length);
				
				
				//add new item to items
				for ( var i = 0; i < arr.length; i++) {
					console.log("adding new item: " + arr[i].id);
					
					//add new item to items
					items.splice(i, 0, arr[i]);
					
					//push new items to newItems
					newItems.push(arr[i]);
				}
				
				if(arr.length > 0){
					//sort items by id
					items.sort(compareItemsById);
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

		var compareItemsById = function(itemA, itemB) {
			if (itemA.id > itemB.id)
				return -1;
			
			if (itemA.id < itemB.id)
				return 1;
			
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
		
		var getNewestId = function() {
			try{
				return items[0].id;
			}catch(e) {
				return undefined;
			}
		}
		
		/*------------------------------------------------------*/
		// Return
		return {
			addItems : addItems,
			addNewItems : addNewItems,
			removeNewItems : removeNewItems,
			//getter
			getItems : getItems,
			getNewItems : getNewItems,
			getNewestId : getNewestId
		};
	};

	return new Data();
});
