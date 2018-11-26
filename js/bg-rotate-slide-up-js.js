$(document).ready(function(){
	/*****************************************************************************
		dealing with the navigation
	*****************************************************************************/	
	
	$(".sSub").each(function(){
		var newWidth = $(this).width();
		$(this).prev().css("width",newWidth);
		$(this).css("display","none");
		//alert( 300 - $(this).height() );
	});
	// Deal with Sub Nav
	$(".sNavWrap").hover(function(){
		// I Loath you IE fix
		if ($.browser.msie && $.browser.version.substr(0,1)<8){var minusPX = "33";}
		else{var minusPX = "32";}
		
		var newHeight = (300 - $(this).children().children(".sSub").height() ) - minusPX +"px";
		//alert(newHeight);
		$(this).animate({
			top: newHeight
		}, 300, function() {
			$(this).children().children(".sSub").show();
		}).stop(true, true);
		$(this).children().children(".sSub").slideDown(300);
	},function(){
      	$(this).animate({
			top: '269px'
		}, 300, function() {
			$(this).children().children(".sSub").hide();
		}).stop(true, true);
		$(this).children().children(".sSub").slideUp(300);
    });
	
	
	
}); // END THE DOM



/*****************************************************************************
	dealing with the rotating images
*****************************************************************************/	
function mainImageFlow()
{
	// set the opacity of image(s) to 0 (can't see them)
	$('#mainImageBox img').css({opacity: 0.0});
	// set the first image to be seen
	$('#mainImageBox img:first').css({opacity: 1.0});
	// set the function for 'mainImageGallery' to run every 3 seconds.
	setInterval('mainImageGallery()',3000);
}
function mainImageGallery()
{
	// if the images have no class (class='show') then show the first one anyway
	var current = ($('#mainImageBox img')?  $('#mainImageBox img') : $('#mainImageBox img:first'));
	//Get next image, if it reached the end of the slideshow, rotate it back to the first image
	var next = ((current.next().length) ? ((current.next().hasClass('sNav'))? $('#mainImageBox img:first') :current.next()) : $('#mainImageBox img:first'));	
	//Set the fade in effect for the next image, show class has higher z-index
	next.css({opacity: 0.0})
	//.addClass('show')
	.animate({opacity: 1.0}, 1000);
	//Hide the current image
	current.animate({opacity: 0.0}, 1000)
	//.removeClass('show');
	//$("#subNavBox").removeClass('show');
}