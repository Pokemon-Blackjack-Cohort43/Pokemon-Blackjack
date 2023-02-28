// contains instructions on how to play
import { useState } from "react";
import InstructionsContent from "./InstructionsContent.js";

const Instructions = ({ gameState, quitHandler, startGameHandler }) => {

  // default setting to display an i card
  // initialize state for displaying of instruactions set to false  
  const [displayInstructions, setDisplayInstructions] = useState(false);

  // on click, change state from false/true  
  const handleClick = () => {
    setDisplayInstructions(!displayInstructions);
  }

  console.log('gamestate', gameState);

  return (
    <section>
      {/* disable button access if game has not started yet */}
      <button onClick={() => { handleClick() }} disabled={!gameState}>{displayInstructions ? "x" : "?"}</button>

      {/* instructions: displays when state is set to true */}
      {
        displayInstructions
          ? <InstructionsContent displayInstructions={displayInstructions} />
          : null
      }
      {/* if game state is false, display 'start game'. else, display 'quit' */}
      <button
        onClick={gameState ? quitHandler : startGameHandler}
      >
        {
          gameState
            ? 'quit'
            : 'start game'
        }
      </button>
    </section>
  )
}

export default Instructions;