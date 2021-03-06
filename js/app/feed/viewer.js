/**
 * Copyright (c) 2013 Futurecom interactive
 * All Rights Reserved.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
'tweenMax', //
'config', //
'app/app', //
'app/data/screenData', //
'app/data/itemData', //
'app/loader/imageLoader', //
], function( $, TweenMax, Config, App, ScreenData, ItemData, ImageLoader ) {

    var Viewer = function( ) {
    	
    	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    	
    	//divs
    	element1 = $("div[data-id='item_1']");
    	element2 = $("div[data-id='item_2']");
    	element3 = $("div[data-id='item_3']");
    	element4 = $("div[data-id='item_4']");
    	element5 = $("div[data-id='item_5']");
    	element6 = $("div[data-id='item_6']");
    	element7 = $("div[data-id='item_7']");
    	
    	/*-------------------------*/
    	
    	var counter = 0;
		
		var arrCurrentItems = [];		
		var arrImages = [];
		
		var currentItem = {};
		
		var refreshTimerObj;

		/*-------------------------*/

    	var videoIsPlaying;
    	var video = $('.imageWrapper.large VIDEO');

    	/*------------------------------------------------------*/

    	var start = function()
    	{
    		console.log("Viewer.start()");
    		
    		processFeedData();
    	};
    	
    	/*------------------------------------------------------*/

		var processFeedData = function()
		{
			var nextId = 0;

			//get items
			var arrItems = ItemData.getItems();

			arrImages = [];
	
			items = $(".imageWrapper");
			
			//check if we have more arrItems than items
			if(arrItems.length < items.length)
			{
				window.setTimeout(start, 10 * 1000);
				return;
			}
			
			//fill up array
			while(arrCurrentItems.length < items.length && arrCurrentItems.length < Config.getMaxItems())
			{
				//get nextId
				nextId = counter % Math.min(arrItems.length, Config.getMaxItems());
				
				//add item to currentItems
				arrCurrentItems.push(arrItems[nextId]);
				
				console.log("nextId: " + nextId);
				
				//update counter
				counter += 1;
			}

			//get current item
			currentItem = arrCurrentItems[0];

			//check for prioritizeNewItems flag
			if(Config.getPrioritizeNewItems())
			{
				//get new items
				var arrNewItems = ItemData.getNewItems();
				
				//fill in new items
				for(var i = 0; i < arrNewItems.length; i++)
				{
					arrCurrentItems.push(arrNewItems[i]);
					//update counter
					counter += 1;
				}
				
				//remove new items in Data Class
				ItemData.removeNewItems();
			}
		
			console.log("counter: " + counter + ", arrItems: " + arrItems.length + ", arrCurrentItems: " + arrCurrentItems.length);
			
			//fill preload image array
			for(var i = 0; i < items.length; i++)
			{
				arrImages.push(arrCurrentItems[i].images.standard_resolution.url);
			}
			
			//start preloading images
			ImageLoader.preloadImages(arrImages).done(
				animateFeed
			);
			
			//remove first element of current array
			arrCurrentItems.shift();
		};

		/*------------------------------------------------------*/
		
		var getImage = function(element)
		{
			var img = arrImages.shift();
			element.find('img').attr('src', img);
		};
		
		var getVideo = function(element)
		{
			if(!ScreenData.getIsIOS() && currentItem.videos)
			{
				console.log("start Video");
				videoIsPlaying = true;
				
				video.attr('src', currentItem.videos.standard_resolution.url);
				video.attr('muted', Config.getMuteSound());
				
				//add video handlers
				video.on('error', videoDone);
				video.on('abort', videoDone);
				video.on('ended', videoDone);

				//add video handlers
				// BUGFIX: http://code.google.com/p/chromium/issues/detail?id=157543
				// Issue on Chrome/Linux special builds
				if(navigator.platform.substring(0, 5) == 'Linux')
				{
					video.on('timeupdate', function(e) {
						if(this.duration - this.currentTime < 0.2) {
							$(this).trigger('ended');
						}
					});
				}
			}
			else
			{
				videoIsPlaying = false;				
			}
		};
		
		var videoDone = function(e)
		{
			console.log("videoDone: " + e.type);
			
			clearRefreshTimeout();
			videoIsPlaying = false;
			
			video.off('error', videoDone);
			video.off('abort', videoDone);
			video.off('ended', videoDone);
			
			//remove special bug handler
			// BUGFIX: http://code.google.com/p/chromium/issues/detail?id=157543
			// Issue on Chrome/Linux special builds
			if(navigator.platform.substring(0, 5) == 'Linux')
			{
				video.off('timeupdate');
			}

			//clear video
			video.attr('src', "");
			
			processFeedData();
		};
		
		var getName = function(element)
		{
			var namebarTitle, namebarText;

			element.find('h1').text(currentItem.user.full_name);
			element.find('span').text(' - @' + currentItem.user.username);
		};
		
		var getCaption = function(element)
		{
			var date = new Date(currentItem.created_time * 1000);
			
			var captureDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
			element.find('h2').text(captureDate);
			
			var caption = "...";
			
			if(currentItem.caption != null)
			{
				caption = currentItem.caption.text;
			}
			else if(currentItem.location != null && currentItem.location.name != null)
			{
				caption = currentItem.location.name; 
			}
			
			element.find('span').text(caption);
		};
		
		/*------------------------------------------------------*/
		
		var animateFeed = function( )
		{
    		//check orientation
			var orientation = ScreenData.getOrientation();
    		var arrElements;
			
    		switch(orientation)
			{
				case 1:
					// landscape
					arrElements = [element1, element2, element3, element5, element6, element4, element7];
					break;
				case 2:
					// portrait 4:3
					arrElements = [element1, element2, element3, element4, element5, element6, element7];
					break;
				default:
					// portrait
					arrElements = [element1, element2, element3, element4, element7, element6, element5];						
			}
			
			var tl = new TimelineMax();
			tl.add([
		        	TweenMax.to(arrElements[0], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getName, onCompleteParams:[arrElements[0]]}),
		        	TweenMax.to(arrElements[0], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "+=0", "sequence", 0 );

			tl.add([
			        TweenMax.to(arrElements[1], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrElements[1]]}),
			        TweenMax.to(arrElements[1], 0.5, {rotationX:0, ease:Expo.easeOut, onComplete:getVideo, onCompleteParams:[arrElements[1]]})
			], "-=0.9", "sequence", 0 );

			tl.add([
			        TweenMax.to(arrElements[2], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getCaption, onCompleteParams:[arrElements[2]]}),
			        TweenMax.to(arrElements[2], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			tl.add([
			        TweenMax.to(arrElements[3], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrElements[3]]}),
			        TweenMax.to(arrElements[3], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			tl.add([
			        TweenMax.to(arrElements[4], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrElements[4]]}),
			        TweenMax.to(arrElements[4], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			tl.add([
			        TweenMax.to(arrElements[5], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrElements[5]]}),
			        TweenMax.to(arrElements[5], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );

			tl.add([
			        TweenMax.to(arrElements[6], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrElements[6]]}),
			        TweenMax.to(arrElements[6], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			
			tl.addCallback(refreshTimeout, "+=0");
		};
    	
		/*------------------------------------------------------*/
		
		var refreshTimeout = function( )
		{
			refreshTimerObj = window.setTimeout(callRefreshTimeout, Config.getAnimationInterval() * 1000);
		};
		
		var callRefreshTimeout = function( )
		{
			if(!videoIsPlaying){
				processFeedData();
			}
		};
		
		var clearRefreshTimeout = function( )
		{
			window.clearTimeout(refreshTimerObj);
		};
		
    	/*------------------------------------------------------*/
    	// Return
    	
    	return {
    		start : start
    	};
    };
    
    return new Viewer();
});
