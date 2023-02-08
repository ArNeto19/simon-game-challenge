import React from "react";

function Footer() {

  const thisYear = new Date().getFullYear();

  return (<footer>
    <p> Copyright ⓒ {thisYear}</p>
    </footer>)

};

export default Footer
