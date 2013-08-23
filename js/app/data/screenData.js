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
'app/config', //
], function($, Config)
{
	var ScreenData = function()
	{
		var windowWidth;
		var windowHeight;

		var orientation = 0;
		var isIOS = false;

		/*------------------------------------------------------*/

		var getWindowWidth = function()
		{
			return windowWidth;
		}

		var setWindowWidth = function(value)
		{
			windowWidth = value;
		}

		/*-------------------------*/

		var getWindowHeight = function()
		{
			return windowHeight;
		}

		var setWindowHeight = function(value)
		{
			windowHeight = value;
		}

		/*-------------------------*/

		var getOrientation = function()
		{
			return orientation;
		}

		var setOrientation = function(value)
		{
			orientation = value;
		}

		/*-------------------------*/

		var getIsIOS = function()
		{
			return isIOS;
		}

		var setIsIOS = function(value)
		{
			isIOS = value;
		}

		/*------------------------------------------------------*/
		// Return
		return {
			getWindowWidth : getWindowWidth,
			setWindowWidth : setWindowWidth,
			getWindowHeight : getWindowHeight,
			setWindowHeight : setWindowHeight,
			getOrientation : getOrientation,
			setOrientation : setOrientation,
			getIsIOS : getIsIOS,
			setIsIOS : setIsIOS
		};
	};

	return new ScreenData();
});
