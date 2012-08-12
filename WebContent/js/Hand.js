var Hand = function(bonus, books, points) {
	this.bonus = defaultZero(bonus);
	this.books = defaultZero(books);
	this.points = defaultZero(points);
	
	this.id = '';
	
	this.total = this.bonus + this.books + this.points; // for jsonify
};

Hand.prototype = {

    getBonus : function() {
        return this.bonus;
    },
    
    getBooks : function() {
        return this.books;
    },
    
    getPoints : function() {
        return this.points;
    },
    
    getTotal : function() {
    	return this.total;
    },
    
    setId : function(id) {
    	this.id = id;
    },
    
    getId : function() {
    	return this.id;
    }
    
};

function defaultZero(param) {
	if(jQuery.trim(param) == '') {
		return 0;
	} else if(!parseInt(param)) {
		return 0;
	} else {
		return parseInt(param);
	}
}