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
'jquery', //
'config', //
], function($, Config)
{
	var Filter = function()
	{
		var apiCalls = Config.getApiCalls();

		var isInTagLimit = function(call, item)
		{
			var maxTagNumber = $.isNumeric(call.maxTagNumber) ? call.maxTagNumber : -1;

			if (maxTagNumber > -1 && item.tags.length > maxTagNumber)
				return false;

			return true;
		};

		var isInFilterlist = function(call, item)
		{
			var list = $.isArray(call.filterTags) ? call.filterTags : [];

			if (list.length > 0)
			{
				for ( var i = 0; i < list.length; i++)
				{
					if ($.inArray(list[i], item.tags) != -1)
					{
						return true;
					}
				}

				return false;
			}

			return true;
		};

		var isInBlacklist = function(call, item)
		{
			var list = $.isArray(call.blacklistTags) ? call.blacklistTags : [];

			for ( var i = 0; i < list.length; i++)
			{
				if ($.inArray(list[i], item.tags) != -1)
				{
					return true;
				}
			}

			return false;
		};

		var isInGeofence = function(call, item)
		{
			var list = $.isArray(call.geoFenceFilters) ? call.geoFenceFilters : [];

			if (list.length > 0)
			{
				for ( var i = 0; i < list.length; i++)
				{
					var geoFence = list[i];
					if (geoFence.BR && geoFence.TL)
					{
						if (item.location && item.location.latitude)
						{
							var latitude = item.location.latitude;
							var longitude = item.location.longitude;

							console.log(latitude + " , " + longitude);
							console.log(geoFence.BR);
							console.log(geoFence.TL);

							if (latitude >= geoFence.BR.latitude && latitude <= geoFence.TL.latitude && longitude >= geoFence.TL.longitude && longitude <= geoFence.BR.longitude)
							{
								return true;
							}
						}
					}
				}

				return false;
			}

			return true;
		};

		/*------------------------------------------------------*/
		// Return
		return {
			isInTagLimit : isInTagLimit,
			isInBlacklist : isInBlacklist,
			isInFilterlist : isInFilterlist,
			isInGeofence : isInGeofence
		};
	};

	return new Filter();
});
