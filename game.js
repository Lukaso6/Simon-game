// array med mulige knapp farger
var buttonColors = ["red", "blue", "green", "yellow"];

// variabler
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// vente på museklikk og starte spillet
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// hører for muse klikk
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // lyd og knapp animasjon
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // sjekke spillerens svar
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // feil svar lyd, feil trykk melding og restarte spill
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// funksjon for og generere neste sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //  random farge og legge til pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // knapp sequence
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// knapp animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// lyd
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Funksjon til og restarte spillet
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
