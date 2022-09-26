//jshint esversion:6

const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let playerName = '';

$.get('http://localhost:3000/api/v1/players-scores', (data) => {

  data.sort((x, y) => {
    return y.level - x.level;
  });

  if (data.length < 5) {
    data.forEach((player) => {
      $('#ranking').append(`<li>
        <mark> ${player.name} </mark>
        <small> ${player.level} </small>
        </li>`);
    });
  } else {
    for (let i = 0; i < data.length; i++) {
      $('#ranking').append(`<li>
        <mark> ${data[i].name} </mark>
        <small> ${data[i].level} </small>
        </li>`);
    }
  }

});


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
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  gamePattern.forEach((color, index) => {
    setTimeout(() => {
      $(`#${color}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(color);
    }, index * 600);

  });

  level++;
  $('#level-title').text('Level ' + level);
}

function playSound(name) {
  let audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  let activeButton = $('#' + currentColour);

  $(activeButton).addClass('pressed');

  setTimeout(function() {
    $(activeButton).removeClass('pressed');
  }, 100);
}

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
}

function gameOver() {
  playSound('wrong');
  $('#level-title').text('Game Over! Press Enter to Save Your Progress');
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 200);
  startOver();
}

function startOver() {
  $(document).keydown(function(event) {

    if (event.key === 'Enter') {
      playerName = prompt('Player Name');

      if (playerName === null || playerName === '') {
        alert('Your score could not be saved! Please enter a valid name.');
      } else {
        $.post('http://localhost:3000/api/v1/players-scores', {
          level,
          playerName
        });
        window.location.reload();
      }

    }

  });

}
