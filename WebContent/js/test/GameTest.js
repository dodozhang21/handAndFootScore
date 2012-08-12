TestCase('GameTest', {

    testInit : function() {
    	var game = new Game(null, null, null);
    	
    	var defaultTeam1 = 'Team 1';
    	var defaultTeam2 = 'Team 2';
    	assertEquals('Should have ' + defaultTeam1 + ' as team 1', defaultTeam1, game.getTeam1());
    	assertEquals('Should have ' + defaultTeam2 + ' as team 2', defaultTeam2, game.getTeam2());
    },
    
    testInit_set : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, null);
    	assertEquals('Should have ' + team1 + ' as team 1', team1, game.getTeam1());
    	assertEquals('Should have ' + team2 + ' as team 2', team2, game.getTeam2());
        
    },
    
    testHandIds : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	var hand1 = new Hand(100, 1200, 725);
    	game.addHandForTeam1(hand1);
    	var hand2 = new Hand(100, 1200, 725);
    	game.addHandForTeam2(hand2); // reference issue <-- therefore implemented clone
    	game.addHandForTeam2(hand2);
    	
    	var uniqueIds = [];
    	
    	for(index in game.getTeam1Hands()) {
    		var thisHand = game.getTeam1Hands()[index];
    		//console.log(thisHand.getId());
    		assertNotNull(thisHand.getId());
    		if(jQuery.inArray(thisHand.getId(), uniqueIds) != -1) {
    			fail('id "' + thisHand.getId() + '" already exists. All hand ids in game are supposed to be unique.');
    		}
    		uniqueIds.push(thisHand.getId());
    	}
    	
    	for(index in game.getTeam2Hands()) {
    		var thisHand = game.getTeam2Hands()[index];
    		//console.log(thisHand.getId());
    		assertNotNull(thisHand.getId());
    		if(jQuery.inArray(thisHand.getId(), uniqueIds) != -1) {
    			fail('id "' + thisHand.getId() + '" already exists. All hand ids in game are supposed to be unique.');
    		}
    		uniqueIds.push(thisHand.getId());
    	}
        
    },
    
    testFindHand : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	var hand1 = new Hand(100, 1200, 725);
    	hand1 = game.addHandForTeam1(hand1);
    	var hand2 = new Hand(100, 1200, 725);
    	hand2 = game.addHandForTeam2(hand2);
    	var hand3 = new Hand(103, 1203, 723);
    	hand3 = game.addHandForTeam2(hand3);
    	
    	assertNotNull(game.findHand(hand1.getId()));
    	assertNotNull(game.findHand(hand2.getId()));
    	assertNotNull(game.findHand(hand3.getId()));
    },
    
    testAddEmptyHand : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	var emptyHand = new Hand(0, 0, 0);
    	game.addHandForTeam1(emptyHand);
    	game.addHandForTeam2(emptyHand);
    	
    	assertEquals('Empty hand should not be added for team 1', 0, game.getTeam1Hands().length);
    	assertEquals('Empty hand should not be added for team 2', 0, game.getTeam2Hands().length);
    },
    
    testGetTeamTotals : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	var hand1Team1 = new Hand(100, 1200, 725);
    	game.addHandForTeam1(hand1Team1);
    	var hand2Team1 = new Hand(100, 1200, 725);
    	game.addHandForTeam1(hand2Team1);
    	
    	var hand1Team2 = new Hand(100, 1000, 540);
    	game.addHandForTeam2(hand1Team2);
    	
    	assertEquals(4050, game.getTeam1Total());
    	assertEquals(1640, game.getTeam2Total());
    },
    
    testGameNotOver_minNotReached : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	var hand1Team1 = new Hand(100, 1200, 725);
    	game.addHandForTeam1(hand1Team1);
    	var hand1Team2 = new Hand(100, 1000, 540);
    	game.addHandForTeam2(hand1Team2);
    	
    	//console.log(game.getWinner());
    	assertFalse('The game is not yet over.', game.getWinner());
    },
    
    testGameNotOver_handsNotEqual : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	var hand1Team1 = new Hand(100, 1200, 725);
    	game.addHandForTeam1(hand1Team1);
    	var hand1Team2 = new Hand(100, 1000, 540);
    	game.addHandForTeam2(hand1Team2);
    	game.addHandForTeam2(hand1Team2);
    	
    	//console.log(game.getWinner());
    	assertFalse('The game is not yet over.', game.getWinner());
    },
    
    testTeam1Win : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	game.addHandForTeam1(new Hand(100, 1200, 725));
    	game.addHandForTeam1(new Hand(0, 5000, 725));
    	game.addHandForTeam1(new Hand(0, 5000, 725));
    	
    	game.addHandForTeam2(new Hand(100, 1000, 540));
    	game.addHandForTeam2(new Hand(0, -500, 250));
    	game.addHandForTeam2(new Hand(100, 4000, 565));
    	
    	//console.log(game.getWinner());
    	assertEquals('Todd and Mike won! Congratulations!', game.getWinner());
    },
    
    testTeam2Win : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	game.addHandForTeam1(new Hand(100, 1000, 540));
    	game.addHandForTeam1(new Hand(0, -500, 250));
    	game.addHandForTeam1(new Hand(100, 4000, 565));
    	
    	game.addHandForTeam2(new Hand(100, 1200, 725));
    	game.addHandForTeam2(new Hand(0, 5000, 725));
    	game.addHandForTeam2(new Hand(0, 5000, 725));
    	
    	//console.log(game.getWinner());
    	assertEquals('Shane and Terry won! Congratulations!', game.getWinner());
    },
    
    testTie : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2, 10000);
    	
    	game.addHandForTeam1(new Hand(100, 1200, 725));
    	game.addHandForTeam1(new Hand(0, 5000, 725));
    	game.addHandForTeam1(new Hand(0, 5000, 725));
    	
    	game.addHandForTeam2(new Hand(100, 1200, 725));
    	game.addHandForTeam2(new Hand(0, 5000, 725));
    	game.addHandForTeam2(new Hand(0, 5000, 725));
    	
    	//console.log(game.getWinner());
    	assertEquals("It's a tie!", game.getWinner());
    }
    
});