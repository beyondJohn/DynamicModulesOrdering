// JavaScript Document
$(document).ready(function () {
    //toggle the component with class accordion_body
    $(".accordion_head").click(function () {
		if ($('.accordion_body').is(':visible')) {
            $(".accordion_body").slideUp(300);
            $(".plusminus").html('<img src="images/plus.png" alt="" />')
			$(".accordion_head").css({
				'background':'#d2d3d4',
				'color':'black'	
			});
        }
        if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).children(".plusminus").html('<img src="images/plus.png" alt="" />');
			$(this).css({
				'background':'#d2d3d4',
				'color':'black'
				});
        } else {
            $(this).next(".accordion_body").slideDown(300);
            $(this).children(".plusminus").html('<img src="images/minus.png" alt="" />');
			$(this).css({
				'background':'blue',
				'color':'#22369d'
				});
        }
    });
});