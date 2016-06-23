$(document).ready(function(){
	
	window.jukebox = new Jukebox();
	window.titleBuilder = new TitleBuilder();
	window.scramble = new Scramble();
	window.ajaxLoader = new AjaxLoader();
	
	ajaxLoader.init();
	jukebox.init();
	scramble.init();
	initScroll();
	initExplain();
	initToggle();

	
	if (isThisHome()) {
	    scramble.start();
	}
	
	
});

function isThisHome() {
    if (ajaxLoader.config.current.parentUrl === "http://innouveau.nl/") {
        return true;
    } else {
        return false;
    }
}

function isThisMobile() {
	if (ajaxLoader.config.windowWidth < 480) {
		return true;
	} else {
		return false;
	}
}


function initExplain() {
	$("[explain]").each(function() {
        setExplain($(this));
    });
    
    $("#it-all").on("click", ".explain-dot", function() {
	    $(this).children(".explain-html").toggle();
	    return false;
	});
}

function setExplain(explain) {
    explain.addClass("explain");
    var html = "<span class='explain-intro'>Onze website is tegelijk een showcase om aan te tonen dat we graag het onmogelijke mogelijk maken.</span><br><br>" + explain.attr("explain");
    explain.append("<div class='explain-dot'><div class='explain-html'>" + html + "</div></div>");
}	

function initToggle() {
	function toggleSide(side) {
	    $(".content-cube-" + side + "-side").toggle();
	}
	
	$("#it-all").on("click", "#header-square", function(event) {
	    toggleSide(currentSideString);   
	});
}

function setCubeLink(cube) {
	var html = cube.html();
    cube.css("width", cube.outerWidth());
    cube.html("");
    cube.append("<div class='cube-wrap'><div class='cube-cube'><div class='cube-front-side cube-side'>" + html + "</div><div class='cube-top-side cube-side'>" + html + "</div><div class='cube-back-side cube-side'>" + html + "</div></div></div>");
}

