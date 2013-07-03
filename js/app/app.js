define([//
'jquery', //
'tweenMax', //
'app/config', //
'app/loader/feedLoader', //
'app/loader/imageLoader', //
], function( $, TweenMax, Config, FeedLoader, ImageLoader ) {

    var App = function( ) {
    	
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

		var windowWidth, windowHeight;
    	
    	var isLandscape;
    	var isIOS;
    	
    	var causeRepaintsOn;
    	
    	var videoIsPlaying;
    	var video = $('.imageWrapper.large VIDEO');

    	/*------------------------------------------------------*/

    	var init = function( ) {
    		//check for ios
    		isIOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    		if(isIOS){
    			$('.imageWrapper.large VIDEO').css("display", "none");
    		}
    		
    		//set window w and h
    		windowWidth = $(window).width();
    		windowHeight = $(window).height();
    	    
    		//check orientation
    		isLandscape = (windowWidth >= windowHeight) ? true : false;
    		
    		causeRepaintsOn = $("h1, h2, span");
    		
    		//set resize listener
            $(window).on('resize', onResize);
            onResize();
    		
            //start App
    		start();
    	}
    	
    	/*------------------------------------------------------*/
    	
    	var onResize = function()
    	{
    		windowWidth = $(window).width();
    		windowHeight = $(window).height();

    		var smallIMG, largeIMG;
    		var imageBlockWidth, imageBlockHeight;
    	    
    		var contentWidth = windowWidth - 1;
    		var contentHeight = windowHeight - 1;
    		
    		var namebarWidth = windowWidth - 2;
    		var namebarHeight = windowHeight - 2;
    		
    		//check orientation
    		isLandscape = (windowWidth >= windowHeight) ? true : false;
    		
    		if (isLandscape)
    		{
    			// landscape
    			smallIMG = (contentWidth / 4) - 1;
    			largeIMG = (smallIMG * 2) + 1;
    			
    			imageBlockWidth = contentWidth;
    			imageBlockHeight = largeIMG;
    			
    			namebarHeight = namebarHeight - largeIMG;
    			namebarHeight = (namebarHeight > 64) ? namebarHeight : 64;
    			
    			$('#infobar').css('width', smallIMG).css('height', smallIMG);
    		} 
    		else
    		{ 
    			// portrait
    			smallIMG = (contentWidth / 3) - 1;
    			largeIMG = namebarWidth;
    			
    			imageBlockWidth = contentWidth;
    			imageBlockHeight = largeIMG + (smallIMG * 2);
    			
    			namebarHeight = namebarHeight - largeIMG - (smallIMG * 2);
    			namebarHeight = (namebarHeight > 62) ? namebarHeight : 62;
    			
    			infoBar = (smallIMG * 2) + 1;
    			
    			$('#infobar').css('width', infoBar).css('height', smallIMG);
    		}

    		$('#imageBlock').css('width', imageBlockWidth).css('height', imageBlockHeight);		

    		$('.namebar').css('width', namebarWidth).css('height', namebarHeight);
    		$('.namebar .innerWrapper').css('height', namebarHeight);
    		
    		$('.imageWrapper.large').css('width', largeIMG).css('height', largeIMG);
    		$('.imageWrapper.large IMG').css('width', largeIMG).css('height', largeIMG);
    		$('.imageWrapper.large VIDEO').css('width', largeIMG).css('height', largeIMG);
    		$('.imageWrapper.large .overlay').css('width', largeIMG).css('height', largeIMG);
    		
    		$('.imageWrapper.small').css('width', smallIMG).css('height', smallIMG);
    		$('.imageWrapper.small IMG').css('width', smallIMG).css('height', smallIMG);
    		$('.imageWrapper.small .overlay').css('width', smallIMG).css('height', smallIMG);
    		
    		// repaint fonts on resize
			causeRepaintsOn.css("z-index", 1);
    	}
    	
    	/*------------------------------------------------------*/

    	var start = function()
    	{
    		console.log("start");
    		
    		FeedLoader.load(onFeedReady);
    	}
    	
    	var onFeedReady = function()
    	{
    		arrItems = FeedLoader.getArrItems();
    		processFeedData();
    	} 
		
    	/*------------------------------------------------------*/
		
//		var loadFeedData = function( url ) {
//			
//			var apiUrl = (url != undefined) ? url : Config.getApiURL();
//			console.log(apiUrl);
//					
//			$.ajax({
//				url: apiUrl,
//				data: {
//					access_token : Config.getAccessToken(),
//					count : 30
//				},
//				type: 'GET',
//				dataType: 'jsonp',
//				success: onFeedDataLoaded
//			});
//		}
//		
//		var onFeedDataLoaded = function(json) {
//			
//			if(json && json.meta.code == 200)
//			{
//				data = json.data;
//				
//				for(var i=0; i<data.length; i++)
//				{
//					if(arrItems.length < Config.getMaxItems())
//					{
//						arrItems.push(data[i]);
//					}
//					else
//					{
//						break;
//					}
//				}
//				
//				console.log(arrItems.length);
//				
//				if(arrItems.length < Config.getMaxItems())
//				{
//					loadFeedData(json.pagination.next_url);
//				}
//				else
//				{
//					processFeedData();
//				}
//			}else{
//				loadFeedData();
//			}
//		}
		
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
			refreshTimerObj = window.setTimeout(startRefreshTimeout, Config.getRefreshTime() * 1000);
		}
		
		var startRefreshTimeout = function( )
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
    		init : init
    	};
    };
    
    return new App();
});
