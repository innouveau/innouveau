function AjaxLoader() {
	this.config = {
		current: menuPages[0],
		windowWidth: $(window).outerWidth(),
		mapSet: false
	};
	this.pages = pages;
	this.sides = [];
	this.currentSide = null;
}

AjaxLoader.prototype.init = function(title) {
	var self = this;
	this.initPages();
	this.currentSide = this.sides[0]
	this.initHistory();
    this.eventListeners();
    if (!isThisMobile()) {
	    for (var i = 1; i < 4; i++) {
	        this.load(this.sides[i], false);
	    }
	}
	this.limitPageLength(this.currentSide);
	
	// cube anchor
	$(".cube").each(function() {
	    setCubeLink($(this));
	});
};

AjaxLoader.prototype.initPages = function() {
	for (var i = 0, l = menuPages.length; i < l; i++) {
		var menuPage = menuPages[i],
			sidePage = {
				parent: menuPage.parent,
				side: menuPage.side,
				rotation: menuPage.rotation,
				current: this.findPage(menuPage.url)
			};
		this.sides.push(sidePage);	
	}
};

AjaxLoader.prototype.initHistory = function() {
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
}

    

AjaxLoader.prototype.load = function(side, animate) {
	var self = this;
    if (animate) {
        $("#new-content-" + side.side).html("");
        $(".content-cube-" + side.side + "-side .loading-gif").show();
    }
    $.ajax({
        url : side.current.url,
        success : function(data, status, xhr) {
            $(".content-cube-" + side.side + "-side .loading-gif").hide();
            self.putContent(data, side.side);
        }
    });
}

AjaxLoader.prototype.putContent = function(data, side) {
	var dynamicData = $(data).find("#new-content-front"),
    	pageTitle = $(data).find('#header-title-section').html();
    $("#new-content-" + side).html(dynamicData);
    $('.content-cube-' + side + '-side').addClass('page-' + pageTitle);
    if (side !== 'front') {
        $("#new-content-" + side + " .cube").each(function() {
            setCubeLink($(this));
        });
        // trigger listeners for dynamic loaded data
        $("#new-content-" + side + " [explain]").each(function() {
            setExplain($(this));
        });
        // order jukebox
        $("#new-content-" + side + " .jukebox-item").each(function() {
            jukebox.placeElement($(this));
        });
    }
};

AjaxLoader.prototype.click = function(element, event) {
	if(!isThisMobile()) {
		event.preventDefault();
    	var url = element.attr("href");
        titleBuilder.setOld($("#header-title-section").html());
        if (url != window.location) {
        	var page = this.findPage(url);
            this.select(page);
        }
        return false;
	}
};

AjaxLoader.prototype.clickChild = function(element, event) {
	if(!isThisMobile()) {
		event.preventDefault();
		var url = element.attr("href"),
			page,
			parent,
			parent;
        titleBuilder.setOld($("#header-title-section").html());
        if (url != window.location) {
        	page = this.findPage(url);
            this.select(page);
        }
        return false;
	}
};

AjaxLoader.prototype.findSide = function(page) {
	for (var i = 0, l = this.sides.length; i < l; i++) {
		var side = this.sides[i];
        if (page.parent == side.parent) {
            return side;
        }
    }
	return null;
}

AjaxLoader.prototype.findPage = function(url) {
	for (var i = 0; i < pages.length; i++) {
        if (url == pages[i].url) {
            return pages[i];
        }
    }
	return null;
}

AjaxLoader.prototype.eventListeners = function() {
	var self = this;
	$("#menu li a").click(function(event) {
		self.click($(this), event);
	});	
	
	// bind click for subpages
	$("#it-all").on("click", ".rotate", function(event) {
		self.clickChild($(this), event);
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
};

AjaxLoader.prototype.select = function(page) {
	var side = this.findSide(page);
	this.currentSide = side;
	// new page to load
	if (page !== side.current) {
		side.current = page;
		this.load(side, true);	
	}
	this.rotatePage(side);
	
};

AjaxLoader.prototype.rotatePage = function(side) {
	if(!isThisMobile()) {
    	var container = document.getElementById("content-cube"),
    		rotation = "rotateY(" + side.rotation + "deg)";
    	titleBuilder.start(side.current.title);
        window.history.pushState({
            myTag : true
        }, "", side.current.url);
        $(container).css({
        	webkitTransform: rotation,
        	MozTransform: rotation,
        	msTransform: rotation,
        	transform: rotation
        })
        document.title = side.current.title;
        this.resetStuff(side);
    }
};

AjaxLoader.prototype.resetStuff = function(side) {
	$("html, body").animate({
            scrollTop : 0
        }, "slow");  
	$("#menu li").removeClass("current-menu-item current-page-ancestor");
    $("#menu a[href='" + side.parent + "']").parent().addClass("current-menu-item");
    if (isThisHome()) {
        scramble.start();
    } else {
        scramble.stop();
    }
    scrollFadeOut();
    this.limitPageLength(side);
}

AjaxLoader.prototype.limitPageLength = function(side) {
	$('.content-cube-side').each(function() {
		$(this).css('height', 'auto');
	});
	var selector = $('.content-cube-' + side.side + '-side'),
		height = selector.outerHeight();
	$('.content-cube-side').each(function() {
		$(this).css('height', height);
	});
	if (this.config.current.title === 'Contact') {
		this.setMap(height);
	}
}

AjaxLoader.prototype.setMap = function(height) {
	if (!this.config.mapSet) {
		$('#canvas-map').css('height', height);
	    var myOptions = { // map settings
	        zoom: 15,
	        center: new google.maps.LatLng(51.910506,4.489805),
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        sensor: 'true',
	        disableDefaultUI: true,
	        draggable: true
	    },
	    	map = new google.maps.Map(document.getElementById("canvas-map"), myOptions);
	    this.config.mapSet = true;
	}
}







