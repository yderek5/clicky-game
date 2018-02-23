import React from "react";
//this is my css
import "./Navpills.css"

//get props from App.js, where we say to render this.state.X where X is message
//currentScore, or topScore.
const Navpills = (props) => 
  
      <nav className="navbar navbar-default navbar-fixed-top">
         <ul>
          <li className="leftBox">Clicky Game</li>
          <li className="centerBox"> {props.message} </li>
          <li className="rightBox">Score: {props.currentScore} | Top Score: {props.topScore}</li>
        </ul>
      </nav>

export default Navpills;