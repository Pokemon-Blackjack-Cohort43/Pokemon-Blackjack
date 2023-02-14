// import GameContainer from "./GameContainer";
// import PlayerCards from "./PlayerCards";

const Player = (props) => {

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
    <>
      <>
    <div className="playerContainer">
        <img src={props.pokeData.sprites.front_default} alt="" />
        <span>{props.pokeData.name}</span>
        <span>0</span>
    </div>

    </>
    </>
  )
}

export default Player;