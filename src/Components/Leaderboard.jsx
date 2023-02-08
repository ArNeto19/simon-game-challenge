import { useState } from "react";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  return (
    <div className="leaderboard">
      <h1> High Scores </h1>
      <ol id="ranking"></ol>
    </div>
  );
}

export default Leaderboard;
