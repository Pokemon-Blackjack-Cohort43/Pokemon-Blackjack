const InstructionsContent = ({ displayInstructions, setDisplayInstructions }) => {

  const handleClick = () => {
    setDisplayInstructions(!displayInstructions);
  }

  return (
    <div onClick={handleClick} className="instructionsParent">
      <div className="dialogueBoxWrapper instructions">
        <h2>How to play:</h2>
        <ul>
          <li>Winner will be the player who has the closest sum of cards to 21 without going over.</li>
          <li><span className="controlSpan">Hit</span> - deals another card to active player</li>
          <li><span className="controlSpan">Stand</span> - stops the card draw and moves on to another player or ends the game</li>
        </ul>
      </div>
    </div>
  )
}

export default InstructionsContent;