import { useState } from "react";
import Title from "./Components/Title";
import Button from "./Components/Button";
// import Leaderboard from "./Components/Leaderboard";
import Footer from "./Components/Footer";

function App() {
  const buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  let level = 0;
  let playerName = "";

  document.addEventListener("keyup", (e) => {
    if (level === 0 && e.key === "Enter") {
      setUserClickedPattern([]);

      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColour = buttonColours[randomNumber];
    }
  });

  return (
    <>
      <Title />
      <div className="container">
        <div className="row">
          <Button id="green" className="btn green" />
          <Button id="red" className="btn red" />
        </div>
        <div className="row">
          <Button id="yellow" className="btn yellow" />
          <Button id="blue" className="btn blue" />
        </div>
      </div>
      {/* <Leaderboard /> */}
      <Footer />
    </>
  );
}

export default App;
