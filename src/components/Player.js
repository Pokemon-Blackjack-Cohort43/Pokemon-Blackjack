import GameContainer from "./GameContainer";
import PlayerCards from "./PlayerCards";

const Player = () => {

  // Data that is stored in state within GameContainer is passed down with props which renders:
  // img for player sprite
  // ul for [playerCards] (peice of state that gets pushed to with each hit)
  // {cardValue} is the result of a funtion that sums the playerCards array
  
  return (
    <>
      <PlayerCards/>
    </>
  )
}

export default Player;