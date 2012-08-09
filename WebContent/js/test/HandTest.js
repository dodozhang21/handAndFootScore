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
    }
    
});