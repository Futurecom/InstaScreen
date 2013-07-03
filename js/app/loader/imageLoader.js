define([//
//
], function()
{
	var ImageLoader = function()
	{
		var preloadImages = function(arr)
		{
			var newimages = [];
			var loadedimages = 0;

			var arr = (typeof arr != "object") ? [ arr ] : arr;
			var postaction = function() {
			}

			function imageLoadPost()
			{
				loadedimages++
				if (loadedimages == arr.length)
				{
					// call postaction and pass in new images array as parameter
					postaction(newimages)
				}
			}

			for ( var i = 0; i < arr.length; i++)
			{
				newimages[i] = new Image()
				newimages[i].src = arr[i]
				newimages[i].onload = function()
				{
					imageLoadPost()
				}
				newimages[i].onerror = function()
				{
					imageLoadPost()
				}
			}

			// return blank object with done() method
			return {
				done : function(f)
				{
					// remember user defined callback functions to be called
					// when images load
					postaction = f || postaction
				}
			}
		}

		/*------------------------------------------------------*/
		// Return
		return {
			preloadImages : preloadImages
		};
	};

	return new ImageLoader();

});
