/* -------------------
	Rummy500 Scoring 
	Authors: efriedman, lklepner
	2015/01/30  v0.0.1
   ------------------- */
   
var playerNames = [];
var currentTurn = 1;
var playerTotals = [];
//var previousPlayers = [];
//var previousTotals = [];
var scoreMax = 0;
var scoreMin = 0;
var playerWithMaxScore = '';
var playerWithMinScore = '';
	
$('#newPlayerForm').submit(addPlayer);
$('#beginGame').submit(beginGame);
$('#additionalRow').submit(addNextRow);

//function to update the "last update" date on the page
function updateDate() {
    var today = new Date();
    var thisDay = today.getDate();
    var thisMonth = (today.getMonth())+1;
    var thisYear = today.getFullYear();
    var fullDate = thisMonth + "/" + thisDay + "/" + thisYear;
    $('#dateDisplay').html(fullDate);
}
updateDate();

//this function will add a new row to the scoring table
function addNextRow() {
    var newRowStart = '<tr><td id="turns">' + currentTurn + '</td>';
    var newRowBalance = "";
	var newRowEnd = '</tr>';
	var newRowFull = "";
	
	//error-checking 
	var scoreError = false;
	if (currentTurn > 1) {
	for (var i = 0; i < playerNames.length; i++) {
		var scoreToBeChecked = $('#player' + i + 'turn' + Number(currentTurn-1)).val()
		scoreError = scoreCheck(scoreToBeChecked);
		if (scoreError === true) {
			break;
			}
		}
	}
		
	if (scoreError === true) {
		alert("Please enter a valid score for all players.\nReminder: \n \u2022 Aces: 15 points on board; -15 if left in hand\n \u2022 Face cards & 10s: 10 on board / -10 in hand\n \u2022 All other cards: 5 on board / -5 in hand");
		return false;
		}
	   	
	//loops through the players and for each player, creates the table row html
	if (scoreError === false) {
    for (var i = 0; i < playerNames.length; i++) {
        newRowBalance += '<td><input type="number" step="5" min="-345" max="345" id="player' + i + 'turn' + currentTurn + '" value="" required></td>';
    }
    
    newRowFull = newRowStart + newRowBalance + newRowEnd;
    
    //adds the new row to the #scoreBody ID in the HTML (the body of the table)
    $('#scoreBody').append(newRowFull);
       	
    //gets the scores from last turn for each player and increments the total scores up   	
    if (currentTurn > 1) {  

        var newTurn = {};
        newTurn.turn = currentTurn;
        newTurn.scores = {};

        for (var i = 0; i < playerNames.length; i++) {
            var lastScoreForPlayer = $('#player' + i + 'turn' + Number(currentTurn - 1)).val()
            newTurn.scores[i] = lastScoreForPlayer;
            
            if (newTurn.scores[i] > scoreMax) {
	            scoreMax = newTurn.scores[i];
	            playerWithMaxScore = playerNames[i];
	            }
	            
	        if (newTurn.scores[i] < scoreMin) {
		        scoreMin = newTurn.scores[i];
		        playerWithMinScore = playerNames[i];
		        }
		        
			playerTotals[i] += Number(lastScoreForPlayer);
        } // close player loop
        
		getTotals();

		victoryCheck();
    }
	currentTurn++;
  }
    return false;
}

//function to add players to the game
function addPlayer() {
	//gets the data from the text input box and checks to make sure it's at least 1 character long
    var myForm = document.getElementById("newPlayerForm");
    var newPlayerName = myForm['playerName'].value;
    if (newPlayerName.length < 1) {
        alert("Enter player name");
        return false;
    }
    //adds the player's name to the playerNames array
    playerNames.push(newPlayerName);
  	
  	//adds 0 to the playerTotals array since the new player's current total score = 0
  	playerTotals.push(0);

	//if 4 players (the maximum) have been entered, causes the "Add Player" form to disappear
    if (playerNames.length === 4) {
        document.getElementById("newPlayerForm").className = "hidden";
    }

	//if 2 players have been entered (the minimum to play) this un-disables the "begin game" button
    if (playerNames.length == 2) {
        $('#beginGameButton').prop('disabled', false);
    }

	//displays "newPlayer name added!" next ot the "add player" button
    $('#newPlayerDisplay').html(newPlayerName + ' added!');
    return false;
}

//function to begin the game by displaying the score table
function beginGame() {
	
	//hides the begin game & add player forms and makes visible the scoring table and add extra row button
	
    $('#beginGame').addClass('hidden');
    $('#newPlayerForm').addClass('hidden');
    $('#scoreTable').removeClass('hidden');
    $('#additionalRowButton').removeClass('hidden');
    $('#gameStats').removeClass('hidden');

    // add table header (the players' names) using loop
    var newHeaders = '';
    newHeaders += '<td id="turns">Hand</td>';
    for (var i = 0; i < playerNames.length; i++) {
        newHeaders += '<td id="pName">' + playerNames[i] + '</td>';
    }
    $('#scoreHeader').html(newHeaders);
    
    //add the first row of the body of table
    addNextRow();
    getTotals();    
    return false;
}

//this function creates the "totals" row
function getTotals() {
	
 	function createTotalRow() {
    var totalStart = '<td>Total</td>';
    var totalBalance = '';
    var totalRow = '';
    for (var q = 0; q < playerNames.length; q++) {
        totalBalance += '<td id="p' + (q + 1) + 'total">' + playerTotals[q] + '</td>';
    }
    totalRow = totalStart + totalBalance;
    $('#scoreTotals').html(totalRow);
    return false;
}
    
    createTotalRow();
}

//error-checking function for the scores entered
function scoreCheck(theScore) {
	if (isNaN(theScore) === true) {
		return true; //checks to make sure the score is a number
		}
		else if (theScore % 5 != 0) {
			return true; //checks to make sure it's divisible by 5
			}
		else if (theScore == '') {
			return true; //checks to make sure it's not blank
			}
		else if (Math.abs(theScore) > 345) {
			return true; //checks to make sure it's not <-345 or >345 (which are impossible)
			}
		else {
			return false;
			}
	}
function createPrevious() {
	var prevDispStart = '<p>Previous game results: ';
	var prevDispEnd = '</p>';
	var prevDispBalance = '';
	var prevDispFull = '';
	
	for (var i = 0; i < previousNames.length; i++) {
		prevDispBalance = previousNames[i] + ', ' + previousTotals[i] + 'points;';
	}
	prevDispBalance.splice(-1, 1, ".");
	prevDispFull = prevDispStart + prevDispBalance + prevDispEnd;
	alert(prevDispFull);
	$('#previousGame').html(prevDispFull);
	}
	
function victoryCheck() {
	var winner = [];
	var winningScore = 0;
	var scoreMax = '';
	
	switch(playerTotals.length) {
		case 2 :
			scoreMax = Math.max(playerTotals[0], playerTotals[1]);
			break;
		case 3 :
			scoreMax = Math.max(playerTotals[0], playerTotals[1], playerTotals[2]);
			break;
		case 4 :
			scoreMax = Math.max(playerTotals[0], playerTotals[1], playerTotals[2], playerTotals[3]);
		}
	
	if (scoreMax >= 500) {	
		winningScore = scoreMax;
		for (var i = 0; i < playerNames.length; i++) {
			if (playerTotals[i] == scoreMax) {
				winner.push(playerNames[i]);
			}
		}
	}
			
	var numWinners = winner.length;
	switch (numWinners) {
		case 0 :
			gameStats();
			break;
		case 1 :
			alert(winner + ' wins, with a score of ' + winningScore + '! \nThanks for playing!');
			gameStats();
			break;
		case 2 :
			alert(winner[0] + ' and ' + winner[1] + ' tied with a score of ' + winningScore + '! \nThanks for playing!');
			gameStats();
			break;
		case 3 :
			alert('Wow! ' + winner[0] + ', ' + winner[1] + ' and ' + winner[2] + ' had a three-way tie for the win! Their winning score was ' + winningScore + '! \nCrazy! Thanks for playing!');
			gameStats();
			break;
		case 4 :
			alert('Un-freakin-believable! EVERYBODY is tied for the victory!' + winner[0] + ', ' + winner[1] + ', ' + winner[2] + ' and ' + winner[3] + ', you\'re all tied with a final score of ' + winningScore + '. Once-in-a-lifetime chance. \nThanks for playing!');
			gameStats();
		}
	
function gameStats() {
		var gameStats = ("Rounds played: " + (currentTurn - 1) + "<br>")
		var maxScore;
		var minScore;
		
		for (var i = 0; i < playerNames.length; i++) {
			gameStats.push(playerNames[i] + ": " + playerTotals[i] + " points. Average: " + (playerTotals[i] / (currentTurn - 1)) + " points.<br>");
		}
		gameStats.push("Highest-scoring round: " + maxScore + " points (" + playerWithMaxScore + ")<br>Lowest-scoring round: " + minScore + " points (" + playerWithMinScore + ")");
		$('#gameStats').html(gameStats);
}
			
						
	/*if(numWinners > 0) {
		previousPlayers = playerNames;
    	previousTotals = playerTotals;
    	createPrevious();
		alert(previousPlayers);
		alert(previousTotals);
		alert(prevDispFull);
		
		/*$('#beginGame').removeClass('hidden' );
		$('#beginGameButton').prop('disabled', true);
   	 	$('#newPlayerForm').removeClass('hidden');	
    	$('#scoreTable').addClass('hidden');
    	$('#additionalRowButton').addClass('hidden');
    	$('#newPlayerDisplay').html('');
    	$('#previousGame').removeClass('hidden');
    	
    	    	
    	winner = [];
    	currentTurn = 1;
    	playerNames = [];
    	playerTotals = [];*/
    	
    	
    	}
