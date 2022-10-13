//jshint esversion:8

const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let playerName = '';
const apiFetch = fetch('https://evening-temple-42830.herokuapp.com/api/v1/players-scores');

apiFetch
  .then(res => res.json())
  .then(data => {
    data.sort((x, y) => y.level - x.level);

    if (data.length < 5) {
      data.forEach((player) => {
        $('#ranking').append(`<li>
          <mark> ${player.name} </mark>
          <small> ${player.level} </small>
          </li>`);
      });
    } else {
      for (let i = 0; i < 5; i++) {
        $('#ranking').append(`<li>
          <mark> ${data[i].name} </mark>
          <small> ${data[i].level} </small>
          </li>`);
      }
    }
  })
  .catch(err => console.error(err));


$(document).one('keydown', (event) => {
  if (level === 0 && event.key === 'Enter') {
    nextSequence();
  }
});

$('.btn').click((event) => {
  if (level === 0) {
    setTimeout(() => {
      nextSequence();
    }, 500);
  } else {
    userChosenColour = event.target.id;
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
    }, index * 500);

  });

  level++;
  $('#level-title').html(`<h1>Level ${level}</h1>`);
}

function playSound(name) {
  let audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  let activeButton = $('#' + currentColour);

  $(activeButton).addClass('pressed');

  setTimeout(() => {
    $(activeButton).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSound('wrong');
  $('#level-title').html("<h1>Game Over!</h1> <p id='save-score'>CLICK HERE to save your score</p>");
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);
  startOver();
}

function postScore() {
  playerName = prompt('Player Name');

  return new Promise((resolve, reject) => {
    if (playerName === null || playerName === '') {
      alert('Your score could not be saved! Please enter a valid name.');
      reject(new Error('Invalid playername. Nothing to POST'));
      startOver();
    } else {
      $.post('https://evening-temple-42830.herokuapp.com/api/v1/players-scores', {
        level,
        playerName
      });
      resolve();
    }
  });
}

function startOver() {
  $('#save-score').one('click', async (event) => {
    await postScore();
    window.location.reload();
  });
}
