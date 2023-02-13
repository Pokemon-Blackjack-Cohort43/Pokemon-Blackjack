const Header = (props) => {

  const gameHandleClick = () => {
    props.setGameStart(!props.gameStart);
  }

  return (
    <>
      <header>
        <h1>Pokemon Blackjack</h1>
      </header>
    </>
  )
}

export default Header;