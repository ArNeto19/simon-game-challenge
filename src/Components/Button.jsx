//jshint esversion:8
import React, {useState} from "react";

function Button(props) {

  function pressButton(event) {
    props.onClick(event.target.id);
  }

  const [isPressed, setIsPressed] = useState(false);
  function animatePress() {
    setIsPressed(true);

    setTimeout(() => setIsPressed(false), 100);
  }


  return (
    <div
      type="button"
      id={props.id}
      className={ `${props.className} ${isPressed ? 'pressed' : ''}` }
      onClick={() => { pressButton(event); animatePress()}}>
    </div>
  )
}



export default Button;
