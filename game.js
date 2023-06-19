/*
Created By: Yuhao Peng
Date: 2023-06-18
Last Update: 2023-06-19
*/

/*  ------------- Functions ---------------- */
function nextSequence() {
  //generate a random number between 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);

  //pick a color
  var randomChosenColor = buttonColors[randomNumber];

  //add the color to the game pattern
  gamePattern.push(randomChosenColor);

  //make the button with the picked color flash
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  //play sound accordingly when button flashes
  playSound(randomChosenColor);

  //level up
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //add pressed class to the chosen color
  $("#" + currentColor).addClass("pressed");

  //remove the pressed class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  //check if the last user click matches the last game click
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //check if user clicked pattern matches game pattern
    if (arrayEquals(userClickedPattern, gamePattern)) {
      //leveling up after 1000 millisecond
      setTimeout(function () {
        nextSequence();
      }, 1000);

      //reset the user clicked pattern
      userClickedPattern = [];
    }
  } else {
    gameOver();
    startOver();
  }
}

function arrayEquals(array1, array2) {
  //check arrays are in same length and each element matches
  return (
    Array.isArray(array1) &&
    Array.isArray(array2) &&
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}

function gameStart() {
  //display ready message
  $("#level-title").text("Ready...");

  //display start message and show animation
  setTimeout(function () {
    $("#level-title").text("Start !");
  }, 1300);

  //start the game
  setTimeout(function () {
    nextSequence();
  }, 3000);
  started = true; //set flag to true once start the game
}

function gameOver() {
  //play error sound
  playSound("wrong");
  //show error animation
  $("body").addClass("game-over");

  //remove the game-over class after 200 milliseconds
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  //display message
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
  //reset the game
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}

/*  ------------- Variables ---------------- */
//an array of colors
var buttonColors = ["red", "blue", "green", "yellow"];

//an array to hold the random picked colors
var gamePattern = [];
//an array to hold the user picked colors
var userClickedPattern = [];

//a flag to track game start
var started = false;

//keep track of game level
var level = 0;

/*  ------------- Events ---------------- */
//user click buttons
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //play sound and animation when user click the button
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //check answer
  checkAnswer(userClickedPattern.length - 1);
});

//user keyboard detection
$(document).keypress(function () {
  if (started) return; //prevent restaring game once game is already started
  gameStart();
});
