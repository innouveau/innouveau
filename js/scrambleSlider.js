function Scramble() {
	this.config = {
		letters : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
		titles : ["MLV Castor", "Bit-Kids", "de Grevelingen", "Havencommunicatie"],
		q : 0,
		currentTitle : '',
		newTitle : '',
		frame : 0,
		updated : [],
		scrambleTimer : null,
		rebuildTimer : null,
		posFound : false,
		imgId : 1,
		slidePlay : false
	}
}

Scramble.prototype.init = function() {
    this.equalize();
}



Scramble.prototype.slider = function() {
	var self = this;
    this.config.updated = [];
    this.config.currentTitle = this.config.titles[this.config.q];
    this.config.frame = 0;
    $("#slider-img-" + this.config.q).css("opacity", 0);
    this.config.q++;
    if (this.config.q === this.config.titles.length) {
        this.config.q = 0;
    }
    $("#slider-img-" + this.config.q).css("opacity", 1);
    this.config.newTitle = this.config.titles[this.config.q];
    this.config.scrambleTimer = setInterval(function() {
        self.startScramble()
    }, 20);
}

Scramble.prototype.startScramble = function() {
	var self = this,
		rndLet, 
		rndPos
    this.config.frame++;
    if (this.config.frame === 20) {
        this.config.rebuildTimer = setInterval(function() {
            self.rebuild()
        }, 40);
    }
    rndLet = this.config.letters[Math.floor(Math.random() * 26)];
    rndPos = Math.floor(Math.random() * this.config.currentTitle.length);
    if (this.config.updated.indexOf(rndPos) === -1 && this.config.currentTitle[rndPos] !== " ") {
        this.config.currentTitle = this.setCharAt(this.config.currentTitle, rndPos, rndLet);
    }
    $("#slider-header").html(this.config.currentTitle);
}

Scramble.prototype.setCharAt = function(str, index, chr) {
    if (index > str.length - 1) {
        return str;
    } else {
    	return str.substr(0, index) + chr + str.substr(index + 1);
    }
}

Scramble.prototype.rebuild = function() {
    this.config.posFound = false;
    while (!this.config.posFound) {
        this.findRandomPos();
    }
}

Scramble.prototype.findRandomPos = function() {
    var self = this,
    	pos = Math.floor(Math.random() * this.config.newTitle.length);
    if (this.config.updated.indexOf(pos) === -1) {
        this.config.updated.push(pos);
        if (this.config.updated.length === this.config.newTitle.length) {
            clearInterval(this.config.rebuildTimer);
            clearInterval(this.config.scrambleTimer);
            if (this.config.slidePlay) {
            	setTimeout(function(){
            		self.slider()
            	}, 3000)
            }
        }
        var let = this.config.titles[this.config.q].substr(pos, 1);
        this.config.currentTitle = this.setCharAt(this.config.currentTitle, pos, let);
        $("#slider-header").html(this.config.currentTitle);
        this.config.posFound = true;
    } else {
        this.config.posFound = false;
    }
}

// helpers

Scramble.prototype.equalize = function() {
    var max = this.getMaxTitleLength();
    for (var i = 0; i < this.config.titles.length; i++) {
    	var dif = max - this.config.titles[i].length;
        if (dif > 0) {
            for (var k = 0; k < dif; k++) {
                if (k % 2 === 0) {
                    this.config.titles[i] += " ";
                } else {
                    this.config.titles[i] = " " + this.config.titles[i];
                }
            }
        }
    }
    $("#slider-header").html(this.config.titles[0]);
    $("#slider-img-0").css("opacity", 1);
}

Scramble.prototype.getMaxTitleLength = function() {
	var max = 0;
    for (var i = 0; i < this.config.titles.length; i++) {
        if (this.config.titles[i].length > max) {
            max = this.config.titles[i].length;
        }
    }
	return max;
}

Scramble.prototype.start = function() {
	var self = this;
    this.config.slidePlay = true;
    setTimeout(function(){
		self.slider()
	}, 3000)
}

Scramble.prototype.stop = function() {
    this.config.slidePlay = false;
}