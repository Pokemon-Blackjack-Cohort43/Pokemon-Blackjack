const Player = ({ pokeData, cardData, cardScore }) => {

  const flattenedCardData = cardData.flatMap(card => card)

  return (
    <li className="playerContainer">
      <div className="displayPoke">
        <img src={pokeData.url} alt={`image of ${pokeData.name}`} />
        <div className="pokeInfo">
          <h3 className="pokeName" >{pokeData.name}</h3>
          <h4 className="pokeScore">{cardScore}</h4>
        </div>

      </div> {/* /.displayPoke */}
      <div className="displayHand">
        {/* shows value of player's hand and images of their cards */}
        <div className="playerCards">
          <ul className="cards">
            {
              flattenedCardData.map((item) => {
                return (
                  <li className="card" key={item.code}>
                    <img src={item.image} alt={item.code}></img>
                  </li>
                )
              })
            }
          </ul>
        </div> {/* /.playerCards */}
      </div> {/* /.displayHand */}
    </li>
  )
}

export default Player;