const Results = ({ result, winner, playerOnePokemon, playerTwoPokemon, currentPlayer }) => {

  // rendered as a result of comparing the hands of both players and winner

  // call to pokemon api for the image of the evolved sprite of the winner is passed down via props from GameContainer and is rendered on the page
  return (
    <>
      <p>
        {
        (currentPlayer !== 'none') && (winner === 'none')
        ? `${currentPlayer}'s turn!` 
        : null}
      </p>
      <p>{result}</p>
      <p>{winner !== 'none'
          ? (
              winner === 'player one'
                ? `${playerOnePokemon.name} is evolving!`
                : (
                  winner === 'player two'
                    ? `${playerTwoPokemon.name} is evolving!`
                    : null
                )
            )
          : null
        }
      </p>
    </>
  )
}

export default Results;