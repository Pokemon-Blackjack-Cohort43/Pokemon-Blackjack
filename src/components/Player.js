// import GameContainer from "./GameContainer";
// import PlayerCards from "./PlayerCards";

const Player = ({ pokeData, cardData, cardScore }) => {

  // Data that is stored in state within GameContainer is passed down with props which renders:
  // img for player sprite
  // ul for [playerCards] (peice of state that gets pushed to with each hit)
  // {cardValue} is the result of a funtion that sums the playerCards array
  // console.log(pokeName);

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