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
			var postaction = function()
			{
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
