function initScroll() {
	$(window).scroll(function() {
	    var windscroll = $(window).scrollTop();
	    html = "";
	    $(".content-cube-" + ajaxLoader.config.currentSideString + "-side  h1, .content-cube-" + ajaxLoader.config.currentSideString + "-side  h2").each(function(i) {
	        if (windscroll - 200 < $(this).position().top &&  windscroll + 450 > $(this).position().top) {
	            html = $(this).html().split("<")[0];
	            
	        } 
	    });
	    if (html == "") {
	        scrollFadeOut();
	    } else {
	        scrollFadeIn(html);
	    }
	    
	    
	}).scroll();
}


function scrollFadeOut() {
    $("#section-output").css("opacity", 0);
}

function scrollFadeIn(html) {
    $("#section-output-html").html(html);
    $("#section-output").css("opacity", 1);
}
