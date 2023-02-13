const Instructions = (props) => {

   // contains instructions on how to play

  // start/deal button that starts game / deals 2 cards and displays GameContainer (ternary operator or routing)

  const gameHandleClick = () => {
    props.setGameStart(!props.gameStart);
  }

  return (
    <>
      <section>
        {/* display if game state is false */}
        {props.gameStart
        ? <p>hiii</p>
        : null
        }
        {/* put instructions in another component and display where <p> is */}
        
        <div className={props.gameStart ? 'hidden' : null}>
          <h2>How to play:</h2>
          <ul>
            <li>1. do this</li>
            <li>2. do that</li>
            <li>3. and that</li>
          </ul>
        </div>
        
        {/* if game state is false, display 'start game'. else, display 'quit' */}
        <button onClick={gameHandleClick} className={props.gameStart ? 'howToPlayBtn' : null}>
          {
          props.gameStart
          ? 'quit'
          : 'start game'}</button>
      </section>
    </>
  )
}

export default Instructions;