// contains instructions on how to play
import { useState } from "react";
import InstructionsContent from "./InstructionsContent.js";

const Instructions = (props) => {

  // default setting to display an i card
  // initialize state for displaying of instruactions set to false  
  const [displayInstructions, setDisplayInstructions] = useState(false);
  
  // on click, change state from false/true  
  const handleClick = () => {
    setDisplayInstructions(!displayInstructions);
  }

  console.log('gamestate', props.gameState)
    return (
        <>
          {/* disable button access if game has not started yet */}
          <button onClick={()=>{handleClick()}} disabled={!props.gameState}>{displayInstructions ? "x" : "?" }</button>

          {/* instructions: displays when state is set to true */}
          {
            displayInstructions 
            ? <InstructionsContent displayInstructions={displayInstructions} />
              : null    
          }

        </>
    )
}

export default Instructions;