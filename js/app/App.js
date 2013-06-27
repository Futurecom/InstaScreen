define([//
'jquery', //
'tweenMax', //
'app/Config', //
'app/utils/Preloader', //
], function( $, TweenMax, Config, Preloader ) {

    var App = function( ) {
    	
    	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    	
    	//divs
    	item1 = $("div[data-id='item_1']");
    	item2 = $("div[data-id='item_2']");
    	item3 = $("div[data-id='item_3']");
    	item4 = $("div[data-id='item_4']");
    	item5 = $("div[data-id='item_5']");
    	item6 = $("div[data-id='item_6']");
    	item7 = $("div[data-id='item_7']");
    	
    	/*-------------------------*/

    	var refreshTime = 8;

    	var refreshTimerObj;
    	
    	/*-------------------------*/
    	
    	var counter = 0;
		var dataLength = 0;
		
		var arrImages = [];
		var currentItem = {};
		
		/*-------------------------*/
    	
    	var windowWidth, windowHeight;
    	
    	var isLandscape;
    	var isIOS;
    	
    	var causeRepaintsOn;
    	
    	var videoIsPlaying;

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

    	var start = function() {
    		console.log("start");
    		
    		loadFeedData();
    	}
		
    	/*------------------------------------------------------*/
		
		var loadFeedData = function( ) {
			$.ajax({
				url: Config.getApiURL(),
				data: {
					access_token : Config.getAccessToken(),
					count : 30
				},
				type: 'GET',
				dataType: 'jsonp',
				success: onFeedDataLoaded
			});
		}
		
		var onFeedDataLoaded = function(json) {
			//parse json
			if(json && json.meta.code == 200){
				
				var data = json.data
				
				dataLength = data.length;
				
				arrImages = [];
		
				var nextId = (counter) % dataLength;
				currentItem = data[nextId];
				
				items = $(".imageWrapper");
				items.each(function(i){
					nextId = (i + counter) % dataLength;
					//add to array
					arrImages.push(data[nextId].images.standard_resolution.url);
				});
			
				//start preloading images
				Preloader.preloadImages(arrImages).done(
					onDataReady
				);
			}else{
				onDataReady();
			}
			
			//update counter
			counter += 1;
		}
		
		var onDataReady = function(){
			animateFeed();
		}
		
		/*------------------------------------------------------*/
		
		var getImage = function(item){
			var img = arrImages.shift();
			item.find('img').attr('src', img);
			
			//clear video
			item.find('video').attr('src', "");
		}
		
		var getVideo = function(item){
			if(currentItem.videos){
				
				console.log("start Video");
				videoIsPlaying = true;
				
				var video = item.find('video');
				
				video.attr('src', currentItem.videos.standard_resolution.url);
				
				//stop timer until video has been played
				video.one('ended', function(e){

					console.log("Video done");
					
					clearRefreshTimeout();
					videoIsPlaying = false;
					
					loadFeedData();
				});
				
			}else{
				videoIsPlaying = false;				
			}
		}
		
		var getName = function(item)
		{
			var namebarTitle, namebarText;

			item.find('h1').text(currentItem.user.full_name);
			item.find('span').text(' - @' + currentItem.user.username);
		}
		
		var getCaption = function(item)
		{
			var date = new Date(currentItem.created_time * 1000);
			
			var captureDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
			item.find('h2').text(captureDate);
			
			var caption = (currentItem.caption != null) ? currentItem.caption.text : "...";
			item.find('span').text(caption);
		}
		
		/*------------------------------------------------------*/
		
		var animateFeed = function( )
		{
			if(isLandscape){
				arrItems = [item1, item2, item3, item5, item6, item4, item7];
			}else{
				arrItems = [item1, item2, item3, item4, item7, item6, item5];
			}
			
			var tl = new TimelineMax();
			tl.add([
			        	TweenMax.to(arrItems[0], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getName, onCompleteParams:[arrItems[0]]}),
			        	TweenMax.to(arrItems[0], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "+=0", "sequence", 0 );

			tl.add([
				        TweenMax.to(arrItems[1], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrItems[1]]}),
				        TweenMax.to(arrItems[1], 0.5, {rotationX:0, ease:Expo.easeOut, onComplete:getVideo, onCompleteParams:[arrItems[1]]})
			], "-=0.9", "sequence", 0 );

			tl.add([
			        TweenMax.to(arrItems[2], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getCaption, onCompleteParams:[arrItems[2]]}),
			        TweenMax.to(arrItems[2], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			tl.add([
			        TweenMax.to(arrItems[3], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrItems[3]]}),
			        TweenMax.to(arrItems[3], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			tl.add([
			        TweenMax.to(arrItems[4], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrItems[4]]}),
			        TweenMax.to(arrItems[4], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			tl.add([
			        TweenMax.to(arrItems[5], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrItems[5]]}),
			        TweenMax.to(arrItems[5], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );

			tl.add([
			        TweenMax.to(arrItems[6], 0.5, {rotationX:90, ease:Expo.easeIn, onComplete:getImage, onCompleteParams:[arrItems[6]]}),
			        TweenMax.to(arrItems[6], 0.5, {rotationX:0, ease:Expo.easeOut})
			], "-=0.9", "sequence", 0 );
			
			
			tl.addCallback(refreshTimeout, "+=0");
		}
    	
		/*------------------------------------------------------*/
		
		var refreshTimeout = function( )
		{
			refreshTimerObj = window.setTimeout(startRefreshTimeout, refreshTime * 1000);
		}
		
		var startRefreshTimeout = function( )
		{
			if(!videoIsPlaying){
				loadFeedData();
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
