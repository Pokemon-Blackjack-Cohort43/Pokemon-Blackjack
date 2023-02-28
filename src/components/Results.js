const Results = ({ result, winner, playerOnePokemon, playerTwoPokemon, currentPlayer, gameStart, quitHandler, evolve }) => {

  // rendered as a result of comparing the hands of both players and winner

  // call to pokemon api for the image of the evolved sprite of the winner is passed down via props from GameContainer and is rendered on the page
  return (
    <section className="results">
      <div className="dialogueBoxWrapper">
        <div className="resultsWording">
          <p>
            {
              (currentPlayer !== 'none') && (winner === 'none')
                ? <><span>{currentPlayer}'s</span> turn!</>
                : ''}
          </p>
          <p>{gameStart
            ? result
            : ''}</p>
          <p>{winner !== 'none'
            ? (
              (winner === 'player one' && result !== 'player one has fully evolved!')
                ? <><span>{playerOnePokemon.name}</span> is evolving!</>
                : (
                  (winner === 'player two' && result !== 'player two has fully evolved!')
                    ? <><span>{playerTwoPokemon.name}</span> is evolving!</>
                    : ''
                )
            )
            : ''
          }
          </p>
        </div>
        <button
          onClick={(result === ('player one has fully evolved!')) || (result === ('player two has fully evolved!'))
            ? quitHandler
            : evolve} disabled={winner === 'none'}>
          {
            (result === ('player one has fully evolved!')) || (result === ('player two has fully evolved!'))
              ? 'play again'
              : 'evolve'
          }
        </button>
      </div>
    </section>
  )
}

export default Results;