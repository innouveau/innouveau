function Jukebox() {
	this.config = {
		current: null,
		currentItemShowedNr: null,
		factor: 1,
		focusSize: 0,
		step: 30,
		x: 0,
		y: 0,
		top: 160,
		width: 186,
		height: 160,
		space: {
			x: 10
		},
		gridWidth: 0,
		init: false,
		visitedPosition: 20
	}
}






Jukebox.prototype.init = function() {
	var self = this;
	this.addListeners();
	this.setSizes();
    this.config.gridWidth = this.getGridWidth();
    $(".jukebox-item").each(function() {
        self.placeElement($(this));
    });
    this.setContainer(this.config.y);
};

// measuring

Jukebox.prototype.setContainer = function(height) {
	$('#jukebox').css('height', height);
	ajaxLoader.limitPageLength(ajaxLoader.currentSide);
}

Jukebox.prototype.setSizes = function() {
	if (ajaxLoader.config.windowWidth > 768) {
		this.config.factor = 0.9;	
		this.config.focusSize = 400
	} else {
		this.config.focusSize = this.config.gridWidth - 80;
		if (ajaxLoader.config.windowWidth > 639){
			this.config.factor = 0.75;
		} else {
			this.config.factor = 0.55;
		}
	}
};

// events


Jukebox.prototype.click = function(element) {
	var self = this,
		itemNr = parseInt(element.attr('item'));
    if (this.config.init === false) {
        $('.jukebox-item').each(function() {
            self.setJukebox($(this));
        });
        this.config.init = true;
    } 
    
    if (itemNr != this.config.currentItemShowedNr) {
    	this.select(element, itemNr);
    } else {
        this.backToGrid(element, itemNr);
    }
};

Jukebox.prototype.select= function(element, itemNr) {
	var self = this;
	element.addClass('focus');
    if (this.config.currentItemShowedNr !== null) {
        var showElement = $('#jukebox-item-' + this.config.currentItemShowedNr);
        this.stop(showElement, this.config.currentItemShowedNr);
        setTimeout(function() {
            self.start(element, itemNr)
        }, 1500)
    } else {
        this.start(element, itemNr)
    }
}

Jukebox.prototype.backToGrid = function(element, itemNr) {
	var self = this;
	this.config.init = false;
    $('#jukebox-item-' + itemNr + ' .jukebox-text').hide();  
    this.sizeElement(element, itemNr, (this.config.width * this.config.factor), (this.config.width * this.config.factor), (100 - itemNr)); 
    element.removeClass('focus');
    this.config.y = 0;
    this.config.x = 0;
    this.config.gridWidth = this.getGridWidth();
    $('.jukebox-item').each(function() {
        self.placeElement($(this));
    });
    this.config.currentItemShowedNr = null;
}





Jukebox.prototype.placeElement = function(element) {
    element.addClass('jukebox-raster');
    element.addClass('jukebox-small');
    element.css({
        'left' : this.config.x,
        'top' : this.config.y,
        'width' : this.config.width * this.config.factor
    });
    this.config.x += (this.config.width * this.config.factor) + (this.config.space.x * this.config.factor);
    if (this.config.x + (this.config.width * this.config.factor) > this.config.gridWidth) {
        this.config.x = 0;
        this.config.y += (this.config.height * this.config.factor);
    }
};

Jukebox.prototype.setJukebox = function(element) {
	var thisItemNr = parseInt(element.attr('item'));
    element.removeClass('jukebox-raster');
    element.css({
        'left' : (thisItemNr * this.config.step),
        'top' : 0,
        'z-index' : (100 - thisItemNr)
    });
    element.removeClass('focus');
}

Jukebox.prototype.start = function(element, itemNr) {
	var self = this;
    this.config.currentItemShowedNr = itemNr;
    element.css('top', this.config.top);
    setTimeout(function() {
        self.moveToLeft(element, itemNr)
    }, 500)
}

Jukebox.prototype.stop = function(element, itemNr) {
	var self = this;
    element.addClass('jukebox-small');
    $('#jukebox-item-' + itemNr + ' .jukebox-text').hide();
    this.sizeElement(element, itemNr, (this.config.width * this.config.factor), (this.config.width * this.config.factor), (100 - itemNr));
    setTimeout(function() {
        self.moveToRight(element, itemNr)
    }, 500)
}







// transformers

Jukebox.prototype.moveToRight = function(element, itemNr) {
	var self = this;
    element.css('left', (itemNr * this.config.step) + 'px');
    setTimeout(function() {
        self.moveToTop(element, itemNr)
    }, 500)
}

Jukebox.prototype.moveToTop = function(element, itemNr) {
    element.css('top', this.config.visitedPosition);
}

Jukebox.prototype.moveToLeft = function(element, itemNr) {
	var self = this;
    element.css('left', '0px');
    setTimeout(function() {
        self.upScale(element, itemNr)
    }, 500)
}

Jukebox.prototype.upScale = function(element, itemNr) {
	var height,
		text = $('#jukebox-item-' + itemNr + ' .jukebox-text'),
		self = this;
    element.removeClass('jukebox-small');
    text.css({
    	display: 'block',
    	opacity: 0
    })
    this.sizeElement(element, itemNr, this.config.gridWidth, this.config.focusSize, 100000); 
    setTimeout(function() {
        text.css('opacity', 1)
    }, 800);
    setTimeout(function() {
    	height = element.outerHeight() + self.config.top;
        self.setContainer(height);
    }, 500);    
}



// helpers

Jukebox.prototype.sizeElement = function(element, itemNr, elementWidth, imgWidth, z) {
	var img = $('#jukebox-item-' + itemNr + ' .jukebox-main-image');
	element.removeClass('jukebox-small');
    element.css({
    	'width': elementWidth,
    	'z-index': z
    });
    img.css('width', imgWidth)	
};

Jukebox.prototype.getGridWidth = function() {
	return parseInt($('#content-cube').width()) - 80;
};

Jukebox.prototype.addListeners = function() {
	var self = this;
	
	$('#it-all').on('click', '.jukebox-item', function() {
		self.click($(this));
	});
};