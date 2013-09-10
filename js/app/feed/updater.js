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
define([ //
'app/config', //
'app/data/itemData', //
'app/loader/feedLoader', //
], function(Config, ItemData, FeedLoader)
{
	var Updater = function()
	{
		var checkTimerObj;

		/*------------------------------------------------------*/

		var start = function()
		{
			console.log("Updater.start()");

			// start check interval for added feed items
			checkTimerObj = window.setInterval(checkForNewItems, Config.getApiInterval() * 1000);
		}

		/*------------------------------------------------------*/

		var checkForNewItems = function()
		{
			console.log("Updater.checkForNewItems()");

			// load feed items
			FeedLoader.loadNewData();
		}

		/*------------------------------------------------------*/
		// Return
		return {
			start : start
		};
	};

	return new Updater();
});
