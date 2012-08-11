var MinScoreToWin = 10000;

var Game = function(team1, team2) {
	
	this.team1 = jQuery.trim(team1) == '' ? 'Team 1' : team1;
    this.team2 = jQuery.trim(team2) == '' ? 'Team 2' : team2;
    
    this.team1Score = 0;
    this.team2Score = 0;
    
    this.team1Hands = [];
    this.team2Hands = [];
};

Game.prototype = {
		
		getTeam1 : function() {
			return this.team1;
		},
		
		getTeam2 : function() {
			return this.team2;
		},
		
		addHandForTeam1 : function(hand) {
			this.team1Hands.push(hand);
		},
		
		addHandForTeam2 : function(hand) {
			this.team2Hands.push(hand);
		},
		
		getTeam1Total : function() {
			return getTotalForHands(this.team1Hands);
		},
		
		getTeam2Total : function() {
			return getTotalForHands(this.team2Hands);
		},
		
		getWinner : function() {
			// if either team is below min score, it's not over
			if(this.getTeam1Total() < MinScoreToWin
					&& this.getTeam2Total() < MinScoreToWin) {
				return 'The game is not yet over.';
			} else {
				if(this.getTeam1Total() > this.getTeam2Total()) {
					return this.getTeam1() + ' won';
				} else if(this.getTeam2Total() > this.getTeam1Total()) {
					return this.getTeam2() + ' won';
				} else {
					return "It's a tie!";
				}
			}
		}

};

function getTotalForHands(hands) {
	var totalForHands = 0;
	for (var index in hands) {
		var hand = hands[index];
		totalForHands += hand.getTotal();
	}
	return totalForHands;
}