// import GameContainer from "./GameContainer";
// import PlayerCards from "./PlayerCards";

const Player = ({ pokeData, cardData, cardScore }) => {

  
  // Data that is stored in state within GameContainer is passed down with props which renders:
  // img for player sprite
  // ul for [playerCards] (peice of state that gets pushed to with each hit)
  // {cardValue} is the result of a funtion that sums the playerCards array
  // console.log(pokeName);

  // const [pokeName, setPokeName] = useState('');
  // const [pokeId, setPokeId] = useState(0);
  // const [pokeImage, setPokeImage] = useState('');

  // setPokeName(pokeData.name);
  // setPokeId(pokeData.id);
  // setPokeImage(pokeData.sprites.front_default)

  const flattenedCardData = cardData.flatMap(card => card)

  return (
      <section className="playerContainer">
        <div className="displayPoke">
          <img src={pokeData.sprites.front_default} alt={`image of ${pokeData.name}`} />
          <p>{pokeData.name}</p>
        </div>
        <div className="displayHand">
          <div className="playerCards">
            <ul>
              {
                flattenedCardData.map((item) => {
                  return (
                    <li key={item.code}>
                      <img src={item.image} alt={item.code}></img>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="playerScore">
            <h4>{cardScore}</h4>


          </div>
        </div>
      </section>

  )
}

export default Player;