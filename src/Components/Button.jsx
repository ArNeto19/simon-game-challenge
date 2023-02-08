import { useState } from "react";

function Button(props) {
  const [isPressed, setIsPressed] = useState(false);

  function pressButton(e) {
    console.log(e.target.id);
  }

  function animatePress() {
    setIsPressed(true);

    setTimeout(() => setIsPressed(false), 100);
  }

  return (
    <button
      type="button"
      id={props.id}
      className={`${props.className} ${isPressed ? "pressed" : ""}`}
      onClick={(e) => {
        pressButton(e);
        animatePress();
      }}></button>
  );
}

export default Button;
