var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function(event) {
  if (level === 0 && event.key === 'Enter') {
    nextSequence();
  }
});

$('.btn').click(function() {
  if (level === 0) {
    setTimeout(function() {
      nextSequence();
    }, 500);
  } else if (level > 0) {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  let audio = new Audio('sounds/' + randomChosenColour + '.mp3');
  audio.play();
  level++;
  $('h1').text('Level ' + level);
};

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
};

function animatePress(currentColour) {
  var activeButton = $('#' + currentColour);

  $(activeButton).addClass('pressed')

  setTimeout(function() {
    $(activeButton).removeClass('pressed')
  }, 100);
};

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    gameOver();
  }
};

function gameOver() {
  playSound('wrong');
  $('h1').text('Game Over! Refresh or Press Enter to Restart')
  $('body').addClass('game-over')
  setTimeout(function() {
    $('body').removeClass('game-over')
  }, 200);
  startOver();
};

function startOver() {
  $(document).keydown(function(event) {
    if (event.key === 'Enter') {
      setTimeout(function() {
        (window.location.reload());
      }, 200);
    }
  })
};
