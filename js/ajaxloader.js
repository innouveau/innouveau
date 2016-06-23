var currentSideString = "front",
	currentSideInt = 0,
	windowWidth = $(window).outerWidth();




function initAjaxLoader() {
    // ajax stuff

    $.ajaxSetup({
        cache : false
    });

    $(function() {
        history.replaceState({
            myTag : true
        }, "", location.pathname);
    });

    $(window).bind("popstate", function(e) {
        if (!e.originalEvent.state.myTag) {
            return;
        } else {
            window.location = location.pathname;
        }
    });

    function loadAjax(url, side, animate) {
        if (animate) {
            $("#new-content-" + side).html("");
            $(".content-cube-" + side + "-side .loading-gif").show();
        }
        $.ajax({
            url : url,
            success : function(data, status, xhr) {
                $(".content-cube-" + side + "-side .loading-gif").hide();
                var dynamicData = $(data).find("#new-content-front"),
                	pageTitle = $(data).find('#header-title-section').html();
                $("#new-content-" + side).html(dynamicData);
                $('.content-cube-' + side + '-side').addClass('page-' + pageTitle);
                if (side !== "front") {
                    $("#new-content-" + side + " .cube").each(function() {
                        setCubes($(this));
                    });
                    $("#new-content-" + side + " [explain]").each(function() {
                        setExplain($(this));
                    });
                    $("#new-content-" + side + " .jukebox-item").each(function() {
                        jukebox.placeElement($(this));
                    });
                }
            }
        });
    }


    // bind click to ratation and title maker

    $("#menu li a").click(function(event) {
    	if(!isThisMobile()) {
	    	var url = $(this).attr("href"),
	            parentUrl = $(this).attr("href");
	        event.preventDefault();
	        titleBuilder.setOld($("#header-title-section").html());
	        if (url != window.location) {
	            for (var i = 0; i < 4; i++) {
	                if (url === menuPages[i][0]) {
	                    var deg = menuPages[i][3],
	                        title = menuPages[i][2],
	                    	side = i;
	                    break;
	                }
	            }
	            rotatePage(url, title, parentUrl, deg, side);
	        }
	        return false;
       }
    });
    
    function rotatePage(url, title, parentUrl, deg, side) {
    	if(!isThisMobile()) {
	    	var container = document.getElementById("content-cube"),
	    		sideString = menuPages[side][1];
	    	titleBuilder.start(title);
	        window.history.pushState({
	            myTag : true
	        }, "", url);
	        $("html, body").animate({
	            scrollTop : 0
	        }, "slow");
	        container.style.webkitTransform = "rotateY(" + deg + "deg)";
	        container.style.MozTransform = "rotateY(" + deg + "deg)";
	        container.style.msTransform = "rotateY(" + deg + "deg)";
	        container.style.transform = "rotateY(" + deg + "deg)";
	        document.title = title;
	        $("#menu li").removeClass("current-menu-item current-page-ancestor");
	        $("#menu a[href='" + parentUrl + "']").parent().addClass("current-menu-item");
	        if (url != menuPages[side][4]) {
	            menuPages[side][4] = url;
	            loadAjax(url, sideString, true);
	        }
	        currentSideString = sideString;
	        currentSideInt = side;
	        if (isThisHome()) {
	            scramble.start();
	        } else {
	            scramble.stop();
	        }
	        scrollFadeOut();
	        limitPageLength(side)
        }
    }

    // bind click for subpages
    $("#it-all").on("click", ".rotate", function(event) {
    	if(!isThisMobile()) {
	        event.preventDefault();
	        titleBuilder.setOld($("#header-title-section").html());
	        var url = $(this).attr("href");
	        if (url != window.location) {
	            for (var i = 0; i < pages.length; i++) {
	                if (url == pages[i][1]) {
	                    var parentUrl = pages[i][0];
	                    var title = pages[i][2];
	
	                    for (var j = 0; j < 4; j++) {
	                        if (parentUrl == menuPages[j][0]) {
	                            var deg = menuPages[j][3];
	                            var side = j;
	                            break;
	                        }
	                    }
	                    rotatePage(url, title, parentUrl, deg, side);
	                    break;
	                }
	            }
	        }
	        return false;
       }
    });
    
    

    // bind click for inner page anchors
    $("#it-all").on("click", "a[href*=#]:not([href=#])", function() {
    	if (!isThisMobile()) {
	        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	            var target = $(this.hash);
	            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	            if (target.length) {
	                $('html,body').animate({
	                    scrollTop : target.offset().top
	                }, 1000);
	                return false;
	            }
	        }
        }
    });

    // cube anchor
    $(".cube").each(function() {
        setCubes($(this));
    });

    $("[explain]").each(function() {
        setExplain($(this));
    });
  

    function setCubes(cube) {
        cube.css("width", cube.outerWidth());
        var html = cube.html();
        cube.html("");
        cube.append("<div class='cube-wrap'><div class='cube-cube'><div class='cube-front-side cube-side'>" + html + "</div><div class='cube-top-side cube-side'>" + html + "</div><div class='cube-back-side cube-side'>" + html + "</div></div></div>");
    }

    function setExplain(explain) {
        explain.addClass("explain");
        var html = "<span class='explain-intro'>Onze website is tegelijk een showcase om aan te tonen dat we graag het onmogelijke mogelijk maken.</span><br><br>" + explain.attr("explain");
        explain.append("<div class='explain-dot'><div class='explain-html'>" + html + "</div></div>");
    }


    $("#it-all").on("click", ".explain-dot", function() {
        $(this).children(".explain-html").toggle();
        return false;
    });
    
    
    // toggle sides
    function toggleSide(side) {
        $(".content-cube-" + side + "-side").toggle();
    }
    
    $("#it-all").on("click", "#header-square", function(event) {
        toggleSide(currentSideString);   
    });
    
    // helper functions
    
    function isThisHome() {
	    if (menuPages[currentSideInt][0] === "http://innouveau.nl/") {
	        return true;
	    } else {
	        return false;
	    }
	}
	
	function isThisMobile() {
		if (windowWidth < 480) {
			return true;
		} else {
			return false;
		}
	}
	
	function limitPageLength(side) {
    	$('.content-cube-side').each(function() {
    		$(this).css('height', 'auto');
    	});
    	var sideString = menuPages[side][1],
    		selector = $('.content-cube-' + sideString + '-side'),
    		length = selector.outerHeight();
    	$('.content-cube-side').each(function() {
    		$(this).css('height', length);
    	});
    	
    }
    

    // init
	if(!isThisMobile()) {
	    for (var i = 1; i < 4; i++) {
	        loadAjax(menuPages[i][0], menuPages[i][1], false);
	    }
    }
        
    limitPageLength(0);


	if (isThisHome()) {
	    scramble.start();
	}
	
   

}
