var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function() {
  if (level === 0) {
    nextSequence();
  }
})

$('.btn').click(function() {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
})

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  let audio = new Audio('sounds/' + randomChosenColour + '.mp3');
  audio.play();
  $('h1').text('Level ' + level);
  level++;
}

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  var activeButton = $('#' + currentColour);

  $(activeButton).addClass('pressed')

  setTimeout(function() {
    $(activeButton).removeClass('pressed')
  }, 100);
}
