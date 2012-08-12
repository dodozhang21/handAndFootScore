TestCase('HandTest', {

    testDefaultZero : function() {
    	assertEquals('Should have 0 passing in null', 0, defaultZero(null));
    	assertEquals('Should have 0 passing in white space', 0, defaultZero('  '));
    	assertEquals('Should have 0 passing in non numeric', 0, defaultZero(' xs19 '));
    	assertEquals('Should have 9 passing in 9', 9, defaultZero(9));
    	assertEquals('Should have 9 passing in 9', 9, defaultZero('9'));
    },
    
    testGetTotal : function() {
    	var hand = new Hand(100, 1200, 300);
    	
    	assertEquals(1600, hand.getTotal());
    	
    	var hand2 = new Hand(0, -300, 355);
    	
    	assertEquals(55, hand2.getTotal());
    	
    	hand3 = new Hand(0, -300, -55);
    	
    	assertEquals(-355, hand3.getTotal());
    },
    
    testGetTotal_text : function() {
    	var hand = new Hand('00', '1200', '655');
    	
//    	console.log(hand.getTotal()); // was 01200655
    	
    	assertEquals(1855, hand.getTotal());
    },
    
    testJson : function() {
    	var hand = new Hand(100, 1200, 300);
    	hand.setId(1);
    	
    	//console.log(JSON.stringify(hand));
    	assertEquals('{"bonus":100,"books":1200,"points":300,"id":1,"total":1600}', JSON.stringify(hand));
    }
    
});