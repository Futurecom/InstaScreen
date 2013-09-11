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
], function(Config)
{
	var Filter = function()
	{
		var apiCalls = Config.getApiCalls();

		var isInTagLimit = function(call, item)
		{
			var maxTagNumber = (call.maxTagNumber != null) ? call.maxTagNumber : -1;

			if (maxTagNumber > -1 && item.tags.length > maxTagNumber)
				return false;

			return true;
		}

		var isInFilterlist = function(call, item)
		{
			var list = (call.filterTags != null) ? call.filterTags : [];

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
		}
		
		var isInBlacklist = function(call, item)
		{
			var list = (call.blacklistTags != null) ? call.blacklistTags : [];

			for ( var i = 0; i < list.length; i++)
			{
				if ($.inArray(list[i], item.tags) != -1)
				{
					return true;
				}
			}

			return false;
		}

		var isInGeofence = function(call, item)
		{
			var list = (call.geoFenceFilters != null) ? call.geoFenceFilters : [];

			if (list.length > 0)
			{
				for ( var i = 0; i < list.length; i++)
				{
					var geoFence = list[i];
					if (geoFence.BR != null && geoFence.TL != null)
					{
						if (item.location != null && item.location.latitude != null)
						{
							var lat = item.location.latitude;
							var lon = item.location.longitude;

							if (lat >= geoFence.BR.lat && lat <= geoFence.TL.lat && lon >= geoFence.TL.lon && lon <= geoFence.BR.lon)
							{
								return true;
							}
						}
					}
				}

				return false;
			}

			return true;
		}

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
