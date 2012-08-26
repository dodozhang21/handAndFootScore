function newGame_resetInputs() {
	// reset inputs
	$('#team1').val('');
	$('#team2').val('');
	$('#minScoreToWin').val('10000');
}

function getHand(prefix) {
	var bonus = $('#' + prefix + '-bonus').val();
	var books = $('#' + prefix + '-books').val();
	var points = $('#' + prefix + '-points').val();
	
	var hand = new Hand(bonus, books, points);
	return hand;
}

function initGameBoard() {
	var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var todaysDate = curr_month + "/" + curr_date + "/" + curr_year;
    
	var team1 = $('#team1').val();
	var team2 = $('#team2').val();
	var minScoreToWin = $('#minScoreToWin').val();
	
	game = new Game(team1, team2, minScoreToWin);
	
	$('span.team1Name').html(game.getTeam1());
	$('span.team2Name').html(game.getTeam2());
	$('#todaysDate').html(todaysDate);
	
	$('span.team1TotalPoints').html('0');
	$('span.team2TotalPoints').html('0');
	$('#gameScoresArea').empty();
	
	$.mobile.changePage ($( '#gameBoard' ));
}

function loadGameBoard() {
	$.mobile.loading( 'show' );

	$('#gameScoresArea').empty();
	
	// which ever team has the longer length
	var max = game.getTeam1Hands().length > game.getTeam2Hands().length ? game.getTeam1Hands().length : game.getTeam2Hands().length;
	
	for(var index = 0; index < max; index++) {
		var team1Hand = game.getTeam1Hands()[index];
		var team2Hand = game.getTeam2Hands()[index];
		
		// even or odd row
		var rowClass = index % 2 == 0 ? 'scoreAlt1' : 'scoreAlt2';
		
		// create a new row
		var rowDiv = $('<div />').appendTo('#gameScoresArea');
		$(rowDiv).addClass("ui-grid-a ui-corner-all " + rowClass);
		var leftColumn = $('<div />').appendTo($(rowDiv));
		$(leftColumn).addClass("ui-block-a scoreColumn");
		var rightColumn = $('<div />').appendTo($(rowDiv));
		$(rightColumn).addClass("ui-block-b scoreColumn");
		
		
		if(team1Hand != null) {
			$("#handTemplate").tmpl(team1Hand).appendTo($(leftColumn));
		}
		if(team2Hand != null) {
			$("#handTemplate").tmpl(team2Hand).appendTo($(rightColumn));
			
		}
		
	}
	
	
	// get totals
	$('span.team1TotalPoints').html(game.getTeam1Total());
	$('span.team2TotalPoints').html(game.getTeam2Total());
	
	$( '#gameBoard' ).trigger('create'); // make jQuery mobile redraw the buttons etc
	
	$.mobile.changePage ($( '#gameBoard' ));
}

function loadTeamNames() {
	$('.team1Name').html(game.getTeam1());
	$('.team2Name').html(game.getTeam2());
}

function clearInputs() {
	$('input').val('');
}