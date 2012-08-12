var Hand = function(bonus, books, points) {
	this.bonus = defaultZero(bonus);
	this.books = defaultZero(books);
	this.points = defaultZero(points);
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
    	return this.bonus + this.books + this.points;
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