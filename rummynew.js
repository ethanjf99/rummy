/* -------------------
	Rummy500 Scoring object take
	Authors: efriedman, lklepner
	2015/01/30  v0.0.1
   ------------------- */
   
var playerNames = [];

$('#newPlayerForm').submit(addPlayer);
$('#beginGame').submit(beginGame);
$('#additionalRow').submit(addNextRow);

/*actions  this is doodle
*enter players -- can prob reuse this code
* want new system where you have a submit form to enter the scores for each player one at a time
* when score entered it should store it in an object...*/

//this is my object constructor function (correct terminology?) for a player object
function player(name) {
	name: this.name,
	scores: [], //array of turn by turn scores
	totalScore: 0,
	calcTotal: function(newScore) {
		this.totalScore += newScore;
		this.scores.push(newScore);
			}
		}
	}	
	
function addPlayer() {
	//gets the data from the text input box and checks to make sure it's at least 1 character long
    var myForm = document.getElementById("newPlayerForm");
    var newPlayerName = myForm['playerName'].value;
    if (newPlayerName.length < 1) {
        alert("Enter player name");
        return false;
    }
    //creates a new object
    new player(playerName);
    
function scoreCheck(newScore) {
	if ((newScore % 5 != 0) || newScore == '' || isNaN(newScore) || Math.abs(newScore) > 550) {
		return false;
	} else {
		return true
		}
		
