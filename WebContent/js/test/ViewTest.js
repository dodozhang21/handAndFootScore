(function(){

	// global var
	
	beforeEach(function() {
		// global set up
	});
	
	describe("new game onload, reset inputs", function() {
		var team1, team2, minScoreToWin;
		beforeEach(function() {
			jasmine.getFixtures().set('<input id="team1" value="team1" /><input id="team2" value="team2" /><input id="minScoreToWin" value="minScoreToWin" />');
			
			team1 = $('#team1');
			team2 = $('#team2');
			minScoreToWin = $('#minScoreToWin');
			
			newGame_resetInputs();
		});
		
		it('inputs should contain the following', function(){
		  expect($(team1).val()).toEqual("");
		  expect($(team2).val()).toEqual("");
		  expect($(minScoreToWin).val()).toEqual("10000");
		});
		
	});
	
	
	describe("getting values from inputs to create a hand", function() {
		var hand;
		beforeEach(function() {
			jasmine.getFixtures().set('<input id="test-bonus" value="100" /><input id="test-books" value="250" /><input id="test-points" value="1000" />');
			
			hand = getHand('test');
		});
		
		it('create the following hand', function(){
			expect(hand.getBonus()).toEqual(100);
//			expect(hand.getBooks()).toEqual("250");
			expect(hand.getBooks()).toEqual(250);
			expect(hand.getPoints()).toEqual(1000);
		});
		
	});

})();