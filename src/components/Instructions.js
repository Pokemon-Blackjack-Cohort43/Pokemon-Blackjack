// contains instructions on how to play
import { useState } from "react";

const Instructions = () => {

  // default setting to display an i card
  // initialize state for displaying of instruactions set to false  
    // when ? button is clicked, change to true and display game instructions 
  const [displayInstructions, setDisplayInstructions] = useState(true);

  const handleClick = () => {
    setDisplayInstructions(!displayInstructions);
  }

    return (
        <>
          <button onClick={()=>{handleClick()}}>{displayInstructions ? "x" : "?" }</button>

          {/* instructions: displays when state is set to true */}
          {
            displayInstructions 
              ? <section>
                  <div>
                    <h2>How to play:</h2>
                    <ul>
                      <li>Winner will be the player who has the closest sum of cards to 21 without going over</li>
                      <li><h3>Move List</h3></li>
                      <li>Hit - deals another card to active player</li>
                      <li>Stand - stops the card draw and moves on to another player or ends the game</li>
                    </ul>
                  </div>
                </section>
              : null    
          }

        </>
    )
}

export default Instructions;