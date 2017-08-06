
$(document).ready(function() {
	//Definition of possible words in game
	var choices = ["Minecraft", "Bioshock", "Portal", "Fallout", "Asteroids", "Diablo", "Starcraft", "Spiro", "Overwatch", "Hearthstone"];	
	//Variable for number of times user guessed word correctly
	var wins = 0;
	//Picks random word from options above
	var randomWord = 0;
	//Definition of word array
	var wordArray = [];
	//Variable to capture the user's input
  var userGuess = "";
  //Array containing all of the user's guesses - non-duplicating
  var guessedArray = [];
  //Array containing the missing letters of the correct word
  var wordTrackingArray = [];
  var guessesRemaining = "";
  var startNewGame = true;

  //key capture function - converts captured key to uppercase and 
  document.onkeyup = function(e){
  	if (startNewGame == true){
  		newGameFunc();
  		startNewGame = false;
  	}
  	else {
	    if (guessesRemaining > 0){
	    userGuess = e.key.toUpperCase();
	    userKeyCode = e.keyCode;
			//only takes action on the keyup if the user types a letter
				if (userKeyCode >= 65 && event.keyCode <= 90) {
					//identifies if the user's guess was part of the randomly chosen word
					if ((wordArray.indexOf(userGuess)) > -1){
				  	for (var i = 0; i < wordArray.length; i++) {
				  		if (userGuess === wordArray[i]) {
				  			//adds the user guess to the tracking array if it matched
				  			wordTrackingArray[i] = wordArray[i];
				  		}
				  	}
				  // reduces lives and changes graphic is the user's guess was not part of the word array - ends game if guesses get to 0
					} else if ((wordArray.indexOf(userGuess)) == -1 && guessedArray.indexOf(userGuess) == -1){
						guessesRemaining--;
						if (guessesRemaining == 5){
							document.getElementById("gallows").src = "img/Hangman-1.png";
						} else if (guessesRemaining == 4){
							document.getElementById("gallows").src = "img/Hangman-2.png";
						} else if (guessesRemaining == 3){
							document.getElementById("gallows").src = "img/Hangman-3.png";
						} else if (guessesRemaining == 2){
							document.getElementById("gallows").src = "img/Hangman-4.png";
						} else if (guessesRemaining == 1){
							document.getElementById("gallows").src = "img/Hangman-5.png";
						} else {
							document.getElementById("gallows").src = "img/Hangman-6.png";
							setTimeout(function(){alert("You Lose! The word was " + wordArray.join("") + ".\nPressing OK Will Resart Game.");}, 100);
							setTimeout(function(){location.reload();}, 500);
						}
					}

					//increases wins if the user guesses the full word correctly
					if (wordTrackingArray.join("") == wordArray.join("")) {
						setTimeout(function(){alert("You Win! Click OK to continue playing.");}, 100);
						wins++;
						startNewGame = true;
					}

					//adds guessed letter to guessed array if it didn't match the word
					if ((wordTrackingArray.indexOf(userGuess)) == -1 && guessedArray.indexOf(userGuess) == -1){
			    	guessedArray.push(userGuess.toUpperCase());
					}
					//updates scoring and user interface with key states
					document.getElementById("guessed").innerHTML = guessedArray.join(" ");
					document.getElementById("wins").innerHTML = wins;
					document.getElementById("currentword").innerHTML = wordTrackingArray.join(" ");
					document.getElementById("guessesremaining").innerHTML = guessesRemaining;
				}
			}	
		}
	};
  //necessary to start the user off with an interface before a keyup event

	function newGameFunc (){
		//Variable for guesses until hung
		guessesRemaining = 6;
		randomWord = Math.floor(Math.random() * 10);
		//Sets word array to random choice without commas in uppercase for easier match analysis
		wordArray = choices[randomWord].toUpperCase().split('');
		//To easily test the correct word
		console.log("Word Array: " + wordArray);
	  //Sets the tracking array to the correct length
	  wordTrackingArray.length = wordArray.length;
	  //Creates placeholders for the tracking array to display to the user
	  for (var i = 0; i < wordTrackingArray.length; i++) {
	  	wordTrackingArray[i] = "_";
	  }
	  document.getElementById("currentword").innerHTML = wordTrackingArray.join(" ");
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("guessesremaining").innerHTML = guessesRemaining;
		document.getElementById("gallows").src = "img/Hangman-0.png";
		guessedArray = [];
		document.getElementById("guessed").innerHTML = "";
	}

});