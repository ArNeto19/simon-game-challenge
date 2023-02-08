//jshint esversion:8
import React, { useState } from "react";
import Axios from "axios";
import Title from "./Title";
import Button from "./Button";
import Leaderboard from "./Leaderboard";
import Footer from "./Footer";

function App() {

  const buttonColours = ['red', 'blue', 'green', 'yellow'];
  let [gamePattern, setGamePattern] = useState([]);
  let [userClickedPattern, setUserClickedPattern] = useState([]);
  let [level, setLevel] = useState(0);
  let [playerName, setPlayerName] = useState('');

  function handleClick(id) {

    if (level === 0) {
      setTimeout(() => {
        nextSequence();
      }, 500);
    } else {
      userClickedPattern.push(id);
      playSound(id);
      checkAnswer(userClickedPattern.length - 1);
    }
  }

  function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    gamePattern.forEach((color, index) => {
      setTimeout(() => {
        // $(`#${color}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(color);
      }, index * 500);

    });

    level++;
    // $('#level-title').html(`<h1>Level ${level}</h1>`);
  }

  function playSound(color) {
    let audio = new Audio('./sounds/' + color + '.mp3');
    audio.play();
  }

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    // } else {
    //   gameOver();
    // }
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

  return (
    <>
      <Title />
      <div className="container">
        <div className="row">
          <Button id="green" className="btn green" onClick={handleClick} />
          <Button id="red" className="btn red" onClick={handleClick} />
        </div>
        <div className="row">
          <Button id="yellow" className="btn yellow" onClick={handleClick} />
          <Button id="blue" className="btn blue" onClick={handleClick} />
        </div>
      </div>
      <Leaderboard />
      <Footer />
    </>
  );
}

export default App;
