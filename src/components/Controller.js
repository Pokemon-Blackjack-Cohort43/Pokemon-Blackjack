const Controller = ({ hitButton, stayButton, winner, result, quitHandler, evolve }) => {
  // functions for onClick are located in GameContainer.js and passed down by props

  // when the user clicks the hit button 1 card is dealt

  // when the user clicks the stay button no card is dealt and it is the next players turn

  return (
    <ul className="controls">
      {
        winner !== 'none'
        ? <li>
          <button
            onClick={(result === ('Player one has fully evolved!')) || (result === ('Player two has fully evolved!'))
              ? quitHandler
              : evolve} disabled={winner === 'none'}>
            {
              (result === ('Player one has fully evolved!')) || (result === ('Player two has fully evolved!'))
                ? 'play again'
                : 'evolve'
            }
          </button>
          </li>

      : <><li>
        <button onClick={hitButton} disabled={winner !== 'none'}>Hit</button>
        </li>
        <li>
          <button onClick={stayButton} disabled={winner !== 'none'}>Stay</button>
        </li></>

      }
    </ul>
  )
}

export default Controller;