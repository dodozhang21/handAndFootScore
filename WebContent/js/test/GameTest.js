TestCase('GameTest', {

    testInit : function() {
    	var game = new Game(null, null);
    	
    	var defaultTeam1 = 'Team 1';
    	var defaultTeam2 = 'Team 2';
    	assertEquals('Should have ' + defaultTeam1 + ' as team 1', defaultTeam1, game.getTeam1());
    	assertEquals('Should have ' + defaultTeam2 + ' as team 2', defaultTeam2, game.getTeam2());
    },
    
    testInit_set : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2);
    	assertEquals('Should have ' + team1 + ' as team 1', team1, game.getTeam1());
    	assertEquals('Should have ' + team2 + ' as team 2', team2, game.getTeam2());
        
    },
    
    testGameNotOver : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2);
    	
    	var hand1Team1 = new Hand(100, 1200, 725);
    	game.addHandForTeam1(hand1Team1);
    	var hand1Team2 = new Hand(100, 1000, 540);
    	game.addHandForTeam2(hand1Team2);
    	
    	//console.log(game.getWinner());
    	assertEquals('The game is not yet over.', game.getWinner());
    },
    
    testTeam1Win : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2);
    	
    	game.addHandForTeam1(new Hand(100, 1200, 725));
    	game.addHandForTeam1(new Hand(0, 5000, 725));
    	game.addHandForTeam1(new Hand(0, 5000, 725));
    	
    	game.addHandForTeam2(new Hand(100, 1000, 540));
    	game.addHandForTeam2(new Hand(0, -500, 250));
    	game.addHandForTeam2(new Hand(100, 4000, 565));
    	
    	//console.log(game.getWinner());
    	assertEquals('Todd and Mike won', game.getWinner());
    },
    
    testTeam2Win : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2);
    	
    	game.addHandForTeam1(new Hand(100, 1000, 540));
    	game.addHandForTeam1(new Hand(0, -500, 250));
    	game.addHandForTeam1(new Hand(100, 4000, 565));
    	
    	game.addHandForTeam2(new Hand(100, 1200, 725));
    	game.addHandForTeam2(new Hand(0, 5000, 725));
    	game.addHandForTeam2(new Hand(0, 5000, 725));
    	
    	//console.log(game.getWinner());
    	assertEquals('Shane and Terry won', game.getWinner());
    },
    
    testTie : function() {
    	var team1 = 'Todd and Mike';
    	var team2 = 'Shane and Terry';
    	
    	var game = new Game(team1, team2);
    	
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