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
define([//
'jquery', //
'tweenMax', //
'app/config', //
'app/feed/updater', //
'app/feed/viewer', //
], function( $, TweenMax, Config, Updater, Viewer ) {

    var App = function( ) {
    	
		var windowWidth, windowHeight;
    	
    	var orientation;
    	var isIOS;
    	
    	var causeRepaintsOn;

    	/*------------------------------------------------------*/

    	var init = function( ) {
    		console.log("App.init()");
    		
    		// check for ios
    		isIOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    		if(isIOS){
    			$('.imageWrapper.large VIDEO').css("display", "none");
    		}
    		
    		// set window w and h
    		windowWidth = $(window).width();
    		windowHeight = $(window).height();
    	    
    		// check orientation
    		orientation = 0;
    		
    		causeRepaintsOn = $("h1, h2, span");
    		
    		// set resize listener
            $(window).on('resize', onResize);
            onResize();
            
            // start App
    		start();
    	}
    	
    	/*------------------------------------------------------*/
    	
    	var onResize = function()
    	{
    		windowWidth = $(window).width();
    		windowHeight = $(window).height();

    		var smallIMG, largeIMGWidth, largeIMGHeight;
    		var imageBlockWidth, imageBlockHeight;
    	    
    		var contentWidth = windowWidth - 1;
    		var contentHeight = windowHeight - 1;
    		
    		var namebarWidth = windowWidth - 2;
    		var namebarHeight = windowHeight - 2;
    		
    		// check orientation:
    		// portrait = 0;
    		// landscape = 1;
    		// portrait 4:3 = 2;
    		orientation = 0;
    		
    		// check for landscape
    		if(windowWidth >= windowHeight) orientation = 1;
    		// check for portrait 4:3
    		if(windowHeight / windowWidth <= (4/3) && windowHeight / windowWidth >= 1.05 ) orientation = 2;  		
    		
			switch(orientation)
			{
				case 1:
					// landscape
	    			smallIMG = (contentWidth / 4) - 1;
	    			largeIMGWidth = (smallIMG * 2);
	    			largeIMGHeight = (smallIMG * 2);
	    			
	    			imageBlockWidth = contentWidth;
	    			imageBlockHeight = largeIMGWidth;
	    			
	    			namebarHeight = namebarHeight - largeIMGWidth;
	    			namebarHeight = (namebarHeight > 64) ? namebarHeight : 64;
	    			
	    			$('.infobar.portrait43').css('display', 'none');
	    			$('.infobar.portrait').css('display', 'block');
	    			
	    			$('.infobar').css('width', smallIMG).css('height', smallIMG);
					break;
				case 2:
					// portrait 4:3
	    			smallIMG = ((contentWidth -1) / 3) ;
	    			largeIMGWidth = (smallIMG * 2) - 1;
	    			largeIMGHeight = (smallIMG * 2) + 1;
	    			
	    			imageBlockWidth = contentWidth;
	    			imageBlockHeight = largeIMGHeight + (smallIMG);
	    			
	    			namebarHeight = windowHeight - (smallIMG * 3);
	    			
	    			$('.infobar.portrait43').css('display', 'block');
	    			$('.infobar.portrait').css('display', 'none');
	    			
	    			infoBar = (smallIMG * 2) -1;
	    			
	    			$('.infobar').css('width', infoBar).css('height', smallIMG);
	    			
	    			$(".imageWrapper[data-id='item_7']").css('display', 'none');
					break;
				default:
					// portrait
	    			smallIMG = (contentWidth / 3) - 1;
	    			largeIMGWidth = namebarWidth;
	    			largeIMGHeight = namebarWidth;
	    			
	    			
	    			imageBlockWidth = contentWidth;
	    			imageBlockHeight = largeIMGHeight + (smallIMG * 2);
	    			
	    			namebarHeight = namebarHeight - largeIMGHeight - (smallIMG * 2);
	    			namebarHeight = (namebarHeight > 62) ? namebarHeight : 62;
	    			
	    			$('.infobar.portrait43').css('display', 'none');
	    			$('.infobar.portrait').css('display', 'block');
	    			
	    			infoBar = (smallIMG * 2) + 1;
	    			
	    			$('.infobar').css('width', infoBar).css('height', smallIMG);
	    			
	    			$(".imageWrapper[data-id='item_7']").css('display', 'block');
			}

    		$('#imageBlock').css('width', imageBlockWidth).css('height', imageBlockHeight);		

    		$('.namebar').css('width', namebarWidth).css('height', namebarHeight);
    		$('.namebar .innerWrapper').css('height', namebarHeight);
    		
    		$('.imageWrapper.large').css('width', largeIMGWidth).css('height', largeIMGHeight);
    		$('.imageWrapper.large IMG').css('width', largeIMGWidth).css('height', largeIMGHeight);
    		$('.imageWrapper.large VIDEO').css('width', largeIMGWidth).css('height', largeIMGHeight);
    		$('.imageWrapper.large .overlay').css('width', largeIMGWidth).css('height', largeIMGHeight);
    		
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
    		
    		// hide loader
    		TweenMax.to('#loader', 0.5, {delay:1.0, css:{autoAlpha:0}, ease:Linear.easeNone})
    		
    		// show content
    		TweenMax.to('#bodyWrapper', 0.5, {delay:1.5, css:{autoAlpha:1}, ease:Linear.easeNone})
    		
    		// init classes
            Viewer.start();
    		
            // start backgroundupdates
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