//jshint esversion:8
import React, {useState, useEffect} from "react";
import Axios from "axios";

function Leaderboard() {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    Axios.get('https://evening-temple-42830.herokuapp.com/api/v1/players-scores')
      .then((res) => {
        res.data.sort((x, y) => y.level - x.level);

        setPlayers(res.data);
      });

  }, []);

  const topPlayers = players.filter( (player, index) => index <= 4);

  return (
    <div className="leaderboard">
      <h1> High Scores </h1>
      <ol id="ranking">
      {topPlayers.map( player => {
        return (
          <li>
          <mark>{player.name}</mark>
          <small>{player.level}</small>
          </li>
        )
      })}
      </ol>
    </div>
  )
}

export default Leaderboard;
