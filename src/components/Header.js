const Header = (props) => {

  const gameHandleClick = () => {
    props.setGameStart(!props.gameStart);
  }

  return (
    <header>
      <div className="wrapper">
        <h1>Pokemon Blackjack</h1>
      </div>
    </header>
  )
}

export default Header;