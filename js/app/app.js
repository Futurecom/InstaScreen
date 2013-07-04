define([//
'jquery', //
'tweenMax', //
'app/config', //
'app/feed/updater', //
'app/feed/viewer', //
], function( $, TweenMax, Config, Updater, Viewer ) {

    var App = function( ) {
    	
		var windowWidth, windowHeight;
    	
    	var isLandscape;
    	var isIOS;
    	
    	var causeRepaintsOn;

    	/*------------------------------------------------------*/

    	var init = function( ) {
    		console.log("App.init()");
    		
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
    		console.log("App.start()");
    		
    		//init classes
            Viewer.start();
    		
            //start backgroundupdates
            Updater.start();
    	}

    	/*------------------------------------------------------*/
    	// Return
    	
    	return {
    		init : init
    	};
    };
    
    return new App();
});