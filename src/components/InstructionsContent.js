const InstructionsContent = () => {
  return (
    <div className="wrapper instructions">
      <h2>How to play:</h2>
      <ul>
        <li>Winner will be the player who has the closest sum of cards to 21 without going over</li>
        <li>Hit - deals another card to active player</li>
        <li>Stand - stops the card draw and moves on to another player or ends the game</li>
      </ul>
    </div>
  )
}

export default InstructionsContent;