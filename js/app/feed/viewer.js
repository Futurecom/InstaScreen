define([//
'jquery', //
'tweenMax', //
'app/app', //
'app/config', //
'app/data/data', //
'app/loader/feedLoader', //
'app/loader/imageLoader', //
], function( $, TweenMax, App, Config, Data, FeedLoader, ImageLoader ) {

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
		
		var arrItems = [];
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
    		
    		//load feed items
    		FeedLoader.load(onFeedReady, true);
    	}
    	
    	var onFeedReady = function()
    	{
    		arrItems = Data.getItems();
    		processFeedData();
    	} 
		
    	/*------------------------------------------------------*/

		var processFeedData = function()
		{
			arrImages = [];
	
			var nextId = (counter) % arrItems.length;
			currentItem = arrItems[nextId];
			
			items = $(".imageWrapper");
			items.each(function(i){
				nextId = (i + counter) % arrItems.length;
				//add to array
				arrImages.push(arrItems[nextId].images.standard_resolution.url);
			});
		
			//start preloading images
			ImageLoader.preloadImages(arrImages).done(
					animateFeed
			);
			
			//update counter
			counter += 1;
		}

		/*------------------------------------------------------*/
		
		var getImage = function(element)
		{
			var img = arrImages.shift();
			element.find('img').attr('src', img);
		}
		
		var getVideo = function(element)
		{
			if(currentItem.videos)
			{
				console.log("start Video");
				videoIsPlaying = true;
				
				video.attr('src', currentItem.videos.standard_resolution.url);
				
				//add video handlers
				video.on('error', videoDone);
				video.on('abort', videoDone);
				video.on('ended', videoDone);
			}
			else
			{
				videoIsPlaying = false;				
			}
		}
		
		var videoDone = function(e)
		{
			console.log("videoDone: " + e.type);
			
			clearRefreshTimeout();
			videoIsPlaying = false;
			
			video.off('error', videoDone);
			video.off('abort', videoDone);
			video.off('ended', videoDone);
			
			//clear video
			video.attr('src', "");
			
			processFeedData();
		}
		
		var getName = function(element)
		{
			var namebarTitle, namebarText;

			element.find('h1').text(currentItem.user.full_name);
			element.find('span').text(' - @' + currentItem.user.username);
		}
		
		var getCaption = function(element)
		{
			var date = new Date(currentItem.created_time * 1000);
			
			var captureDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
			element.find('h2').text(captureDate);
			
			var caption = (currentItem.caption != null) ? currentItem.caption.text : "...";
			element.find('span').text(caption);
		}
		
		/*------------------------------------------------------*/
		
		var animateFeed = function( )
		{
    		//check orientation
    		var isLandscape = ($(window).width() >= $(window).height()) ? true : false;
    		var arrElements;
			
			if(isLandscape){
				arrElements = [element1, element2, element3, element5, element6, element4, element7];
			}else{
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
		}
    	
		/*------------------------------------------------------*/
		
		var refreshTimeout = function( )
		{
			refreshTimerObj = window.setTimeout(callRefreshTimeout, Config.getAnimationInterval() * 1000);
		}
		
		var callRefreshTimeout = function( )
		{
			if(!videoIsPlaying){
				processFeedData();
			}
		}
		
		var clearRefreshTimeout = function( )
		{
			window.clearTimeout(refreshTimerObj);
		}
		
    	/*------------------------------------------------------*/
    	// Return
    	
    	return {
    		start : start
    	};
    };
    
    return new Viewer();
});
