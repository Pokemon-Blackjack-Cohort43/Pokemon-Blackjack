const Results = ({ result, winner, playerOnePokemon, playerTwoPokemon, currentPlayer, gameStart}) => {

  // rendered as a result of comparing the hands of both players and winner

  return (
    <section className="results">
      <div className="dialogueBoxWrapper">
        <div className="resultsWording">
          <p>
            {
              (currentPlayer !== 'none') && (winner === 'none')
                ? `${currentPlayer}'s turn!`
                : ''}
          </p>
          <p>{gameStart
            ? result
            : ''}</p>
          <p>{winner !== 'none'
            ? (
              (winner === 'player one' && result !== 'Player one has fully evolved!')
                ? <p><span>{playerOnePokemon.name}</span> is evolving!</p>
                : (
                  (winner === 'player two' && result !== 'Player two has fully evolved!')
                    ? <p><span>{playerTwoPokemon.name}</span> is evolving!</p>
                    : ''
                )
            )
            : null
          }
          </p>
        </div>
      </div>
    </section>
  )
}

export default Results;