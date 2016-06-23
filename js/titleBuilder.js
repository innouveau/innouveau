function TitleBuilder() {
	this.config = {
		old : '',
		new : '',
		builder : null,
		killer : null,
		q : 0
	};
}

TitleBuilder.prototype.setOld = function(title) {
	this.config.old = title;
};

TitleBuilder.prototype.start = function(title) {
	var self = this;
	this.config.killer = setInterval(function() {
        self._kill(title);
    }, 30);
};

TitleBuilder.prototype._kill = function(title) {
	var self = this;
    this.setOld(this.config.old.substr(0, (this.config.old.length - 1)));
    // title fully killed
    if (this.config.old.length === 0) {
        clearInterval(this.config.killer);
        this.config.builder = setInterval(function() {
            self._build(title);
        }, 50);
    }
    $("#header-title-section").html(titleBuilder.old);
}

TitleBuilder.prototype._build = function(title) {
    this.config.new += title.substr(this.config.q, 1);
    $("#header-title-section").html(this.config.new);
    this.config.q++;
    // title fully built
    if (this.config.q === title.length) {
        clearInterval(this.config.builder);
        this.config.new = '';
        this.config.q = 0;
    }
}