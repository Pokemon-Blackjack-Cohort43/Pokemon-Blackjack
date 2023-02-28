import InstructionsContent from "./InstructionsContent.js";

const Instructions = ({ gameState, quitHandler, startGameHandler, setDisplayInstructions, displayInstructions }) => {

  // on click, change state from false/true  
  const handleClick = () => {
    setDisplayInstructions(!displayInstructions);
  }

  return (
    <section className="instructionsContainer wrapper">

      {/* instructions: displays when state is set to true */}
      {
        displayInstructions
          ? <InstructionsContent displayInstructions={displayInstructions} setDisplayInstructions={setDisplayInstructions} />
          : null
      }

      {/* disable button access if game has not started yet */}
      <button className="instructionsButton" onClick={() => { handleClick() }} disabled={!gameState}>{displayInstructions ? "x" : "?"}</button>

      {/* if game state is false, display 'start game'. else, display 'quit' */}
      <button
        onClick={gameState ? quitHandler : startGameHandler}
        className={gameState ? 'howToPlayBtn' : null}
        id='startButton'
      >
        {
          gameState
            ? 'quit'
            : 'start'
        }
      </button>
    </section>
  )
}

export default Instructions;