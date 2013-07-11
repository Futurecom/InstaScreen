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
    		
    		//load feed items
    		FeedLoader.loadData(processFeedData, true);
    	}
    	
    	/*------------------------------------------------------*/

		var processFeedData = function()
		{
			var nextId = 0;

			//get items
			var arrItems = Data.getItems();
			var arrNewItems = Data.getNewItems();

			arrImages = [];
	
			items = $(".imageWrapper");
			
			//fill up array
			while(arrCurrentItems.length < items.length && arrCurrentItems.length < Config.getMaxItems()){
				
				//get nextId
				nextId = counter % Config.getMaxItems();
				
				//add item to currentItems
				arrCurrentItems.push(arrItems[nextId]);
				
				console.log("nextId: " + nextId);
				
				//update counter
				counter += 1;
			}

			//get current item
			currentItem = arrCurrentItems[0];

			//fill in new items
			for(var i = 0; i < arrNewItems.length; i++){
				arrCurrentItems.push(arrNewItems[i]);
				
				counter += 1;
			}
			
			//remove new items in Data Class
			Data.removeNewItems();
		
			console.log("counter: " + counter + ", arrItems: " + arrItems.length + ", arrCurrentItems: " + arrCurrentItems.length);
			
			//fill preload image array
			for(var i = 0; i < items.length; i++){
				arrImages.push(arrCurrentItems[i].images.standard_resolution.url);
			}
			
			//start preloading images
			ImageLoader.preloadImages(arrImages).done(
				animateFeed
			);
			
			//remove first element of current array
			arrCurrentItems.shift();
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
