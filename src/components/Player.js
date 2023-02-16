// import GameContainer from "./GameContainer";
// import PlayerCards from "./PlayerCards";

const Player = ({pokeData}) => {

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

  return (
      <section className="playerContainer">
        <div className="displayPoke">
          <img src={pokeData.sprites.front_default} alt={`image of ${pokeData.name}`} />
          <p>{pokeData.name}</p>
        </div>
        <div className="displayHand">
        {/* shows value of player's hand and images of their cards */}
          <div className="playerCards">
            {
              // map through the array of cards in the player's hand and display an <img/> for it
            }
          </div>
          <p className="playerScore"></p>
        </div>
      </section>

  )
}

export default Player;