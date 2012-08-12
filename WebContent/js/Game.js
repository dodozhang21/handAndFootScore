var Game = function(team1, team2, minScoreToWin) {
	
	this.team1 = jQuery.trim(team1) == '' ? 'Team 1' : team1;
    this.team2 = jQuery.trim(team2) == '' ? 'Team 2' : team2;
    this.minScoreToWin = minScoreToWin;
    
    this.team1Score = 0;
    this.team2Score = 0;
    
    this.team1Hands = {};
    this.team2Hands = {};
    
    this.handCounter = 0;
};

Game.prototype = {
		
		getTeam1 : function() {
			return this.team1;
		},
		
		getTeam2 : function() {
			return this.team2;
		},
		
		getTeam1Hands : function() {
			return getHandsArray(this.team1Hands);
		},
		
		getTeam2Hands : function() {
			return getHandsArray(this.team2Hands);
		},
		
		addHandForTeam1 : function(hand) {
			if(!isHandEmpty(hand)) {
				// clone a copy of the hand http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object (John Resig's recommendation :))
				var newHand = jQuery.extend({}, hand);
//				var newHand = hand;
				
				this.handCounter++;
				newHand.setId(this.handCounter);
				this.team1Hands[this.handCounter] = newHand;
				return newHand;
			}
		},
		
		addHandForTeam2 : function(hand) {
			if(!isHandEmpty(hand)) {
				// clone a copy of the hand http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object (John Resig's recommendation :))
				var newHand = jQuery.extend({}, hand);
//				var newHand = hand;

				this.handCounter++;
				newHand.setId(this.handCounter);
				this.team2Hands[this.handCounter] = newHand;
				return newHand;
			}
		},
		
		getTeam1Total : function() {
			return getTotalForHands(this.team1Hands);
		},
		
		getTeam2Total : function() {
			return getTotalForHands(this.team2Hands);
		},
		
		getWinner : function() {
			// if both teams are below min score, it's not over
			// or if the number of hands are not equal
			if(this.minScoreToWin == null
					|| (this.getTeam1Total() < this.minScoreToWin
							&& this.getTeam2Total() < this.minScoreToWin)
					|| (this.getTeam1Hands().length != this.getTeam2Hands().length)) {
				return false;
			} else {
				if(this.getTeam1Total() > this.getTeam2Total()) {
					return this.getTeam1() + ' won! Congratulations!';
				} else if(this.getTeam2Total() > this.getTeam1Total()) {
					return this.getTeam2() + ' won! Congratulations!';
				} else {
					return "It's a tie!";
				}
			}
		},
		
		findHand : function(id) {
			if(this.team1Hands[id] != null) {
				return this.team1Hands[id];
			} else if(this.team2Hands[id] != null) {
				return this.team2Hands[id];
			} else {
				return null;
			}
		}, 
		
		getMinScoreToWin : function() {
			return this.minScoreToWin;
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
function getHandsArray(handsMap) {
	var handsArray = [];
	for (var index in handsMap) {
		handsArray.push(handsMap[index]);
	}
	return handsArray;
}
function isHandEmpty(hand) {
	return hand.getBonus() == 0
		&& hand.getBooks() == 0
		&& hand.getPoints() == 0
		;
}