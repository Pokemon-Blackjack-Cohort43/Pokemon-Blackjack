import axios from "axios";
import Player from "./Player";
import Controller from "./Controller";
import Instructions from "./Instructions";
import InstructionsContent from "./InstructionsContent";
import Results from "./Results";
import { useState, useEffect } from 'react';


const GameContainer = () => {
  console.log('GameContainer has mounted');

  // state to track game start
  const [gameStart, setGameStart] = useState(false);
  //

  // PUESDDO CODE:
  // API calls wrapped in useEffect to request data and save the response into state that will be passed down to corresponding components as props
  // function for determining the total of PlayerCards array and comparing them
  // when there is a winner render Results.js component of corresponding player
  // updates piece of state {winningPokemonId} adds 1 and calls the pokemon API with that id in the params 
  //

  // FILTERING FOR POKEMON THAT MEET THE CRITERIA OF 1ST OF 3 EVOLVED STATES
  // array of available pokemon selection
  const pokemonPool = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18],
    [29, 30, 31],
    [32, 33, 34],
    [43, 44, 45],
    [60, 61, 62],
    [63, 64, 65],
    [66, 67, 68],
    [69, 70, 71],
    [74, 75, 76],
    [92, 93, 94]
  ]

  const randomizer = (arrayOfPoke) => {
    const currentIndex = Math.floor(Math.random() * arrayOfPoke.length);
    return arrayOfPoke[currentIndex]
  }
  //


  // INITIAL POKEMON API CALL
  // state for saving poke data to pass to player component as props
  const [pokemonPlayerOneFam, setPokemonPlayerOneFam] = useState([]);
  const [pokemonPlayerTwoFam, setPokemonPlayerTwoFam] = useState([]);
  const [pokemonPlayerOne, setPokemonPlayerOne] = useState([]);
  const [pokemonPlayerTwo, setPokemonPlayerTwo] = useState([]);


  const pokeFam = randomizer(pokemonPool);
  const pokeFam2 = randomizer(pokemonPool);

  useEffect(() => {
    
// API CALLS FOR PLAYER 1 
    const urlEndpointsP1 = [
      `https://pokeapi.co/api/v2/pokemon/${pokeFam[0]}`,
      `https://pokeapi.co/api/v2/pokemon/${pokeFam[1]}`,
      `https://pokeapi.co/api/v2/pokemon/${pokeFam[2]}`
    ];

    const requestsP1 = urlEndpointsP1.map((url) => axios.get(url));

    Promise.all(requestsP1).then((responses) => {
      const pokemonPlayerOneFam = responses.map((res) => ({
        name: res.data.name,
        url: res.data.sprites.front_default,
      }));

      setPokemonPlayerOneFam(pokemonPlayerOneFam);
      setPokemonPlayerOne(pokemonPlayerOneFam[0]);

    }).catch((error) => {
      console.log(error, 'error fetching data')
    });


    // API CALLS FOR PLAYER 2 
    const urlEndpointsP2 = [
      `https://pokeapi.co/api/v2/pokemon/${pokeFam2[0]}`,
      `https://pokeapi.co/api/v2/pokemon/${pokeFam2[1]}`,
      `https://pokeapi.co/api/v2/pokemon/${pokeFam2[2]}`
    ];

    const requestsP2 = urlEndpointsP2.map((url) => axios.get(url));

    Promise.all(requestsP2).then((responses) => {

      const pokemonPlayerTwoFam = responses.map((res) => ({
        name: res.data.name,
        url: res.data.sprites.front_default,
      }));

      setPokemonPlayerTwoFam(pokemonPlayerTwoFam);
      setPokemonPlayerTwo(pokemonPlayerTwoFam[0]);


    }).catch((error) => {
      console.log(error, 'error fetching data')
    });


  }, [gameStart]);




  // API CALL TO GET THE DECK OF CARDS FOR THE HAND
  // state to track card draw and player hand
  const [deck, setDeck] = useState([]);
  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('none');
  const [result, setResult] = useState('Draw a card!');
  const [winner, setWinner] = useState('none');

  // deck of cards api call
  useEffect(() => {

    axios({
      url: `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
      method: `get`,
      dataResponse: `json`
    }).then((res) => {
      axios({
        url: `https://www.deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=52`,
        method: `get`,
        dataResponse: `json`
      }).then((response) => {
        setDeck(response.data.cards);
      }).catch((err) => {
        console.log("error", err.message);
      })
    })
  }, []);

  // initalize current deck
  const currentDeck = deck;
  console.log(deck);

  const startGameHandler = () => {
    setGameStart(!gameStart);
    setCurrentPlayer('player one');

    const check = currentDeck.splice(0, 2);
    const check2 = currentDeck.splice(0, 2);

    setPlayerOneHand(hand => [...hand, check]);
    setPlayerTwoHand(hand => [...hand, check2]);
  }
  //

  
  // console.log('PLAYERHAND ONE', playerOneHand);
  // console.log('PLAYERHAND TWO', playerTwoHand);


  // flatten array by one level
  // const cardsInHand = playerOneHand.flatMap(item => item);
  // console.log(cardsInHand);

  // function to calculate score of cards in hand
  const cardScore = (cardSum) => {
    let score = 0;
    
    const faceCards = ['QUEEN', 'KING', 'JACK'];
    const updatedDeck = cardSum.flatMap(item => item)
    
    // provided numerical values to face cards
    for (let cards of updatedDeck) {
      console.log('cards', cards.value);
      const cardsInt = parseInt(cards.value);
      
      if (faceCards.includes(cards.value)) {
        score = score + 10;
      }
      else if (cards.value.includes('ACE')) {
        if (score <= 10) {
          score = score + 11
        } else (score++)
      }
      else (score += cardsInt);
    }
    return score
  }
  //
  
  // tally the score of each player and pass to player components in the return as props
  const scoreValue = cardScore(playerOneHand);
  const scoreTwoValue = cardScore(playerTwoHand)
  console.log('score ONE', scoreValue);
  console.log('score TWO', scoreTwoValue);
  
  // if player1/player2 get 21, pass turn to other player
  // if score is above 21, that player busts and the other player wins
  useEffect(() => {
    const test = () => {
      
      if (scoreValue === 21) {
        setCurrentPlayer("player two");
        setWinner('none');
        setResult('Player1 has blackjack. Player2 has a chance to draw to 21.');
      } else if (scoreTwoValue === 21) {
        setCurrentPlayer("player one");
        setWinner('none')
        setResult('Player2 has blackjack. Player1 has a chance to draw to 21.')
      }
      
      if (scoreValue > 21) {
        setResult(`Player 2 wins. Player 1 busted!`);
        setWinner('player two');
      }
      
      if (scoreTwoValue > 21) {
        setResult(`Player 1 wins. Player 2 busted!`);
        setWinner('player one');
      }
    }
    test();
  }, [playerOneHand, playerTwoHand]);

  // stay handler
  const stayHandler = () => {
    //if pressed by playerTwo, compare player scores and pass winner to results for results to display the evolving pokemon
    //if pressed by playerOne, setCurrentPlayer(playerTwo)
    if (currentPlayer === "player two") {
      if (scoreValue < scoreTwoValue) {
        setCurrentPlayer('none');
        setWinner('player two');
        setResult(`Player 2 wins. Their card score is closer to 21.`)
      } else if (scoreValue > scoreTwoValue) {
        setCurrentPlayer('none');
        setWinner('player one');
        setResult(`Player 1 wins. Their card score is closer to 21.`)
      }
      else if (scoreTwoValue === scoreValue) {
        setCurrentPlayer('none');
        setWinner('tie');
        setResult(`It's a tie!`);
      }
    } else { setCurrentPlayer(currentPlayer === "player one" ? "player two" : "player one"); }
  }
  //
  
  // handleClick functions that will be passed to our Controller.js buttons as props
  // on click, add card to player's hand, based on current player
  const hitHandler = () => {
    const check = currentDeck.splice(0, 1);

    if (currentPlayer === "player one") {
      setPlayerOneHand(hand => [...hand, check]);
    } else if (currentPlayer === "player two") {
      setPlayerTwoHand(hand => [...hand, check]);
    }
  }

  // quit the current hand - resets player and game play states
  const quitHandler = () => {
    setPlayerOneHand([]);
    setPlayerTwoHand([]);
    setGameStart(false);
    setCurrentPlayer('none');
    setResult('Draw a card!')
    setWinner('none');
  }
  //

  return (
    <main>
      <Instructions gameState={gameStart} />
      <Results result={result} winner={winner} playerOnePokemon={pokemonPlayerOne} playerTwoPokemon={pokemonPlayerTwo} currentPlayer={currentPlayer} />

      {/* if game state is false, display 'start game'. else, display 'quit' */}
      <button
        onClick={gameStart ? quitHandler : startGameHandler}
        className={gameStart ? 'howToPlayBtn' : null}
      >
        {
          gameStart
            ? 'quit'
            : 'start game'
        }
      </button>

      {/* display instructions on default. on game start, remove instructions display and display players*/}
      {
        gameStart
          ? <section className="players">
            <div className="wrapper">
              <ul className="players">
                <Player pokeData={pokemonPlayerOne} cardData={playerOneHand} cardScore={scoreValue} />
                <Player pokeData={pokemonPlayerTwo} cardData={playerTwoHand} cardScore={scoreTwoValue} />
              </ul>
            </div>
          </section>
          : <InstructionsContent />
      }

      {/* when game state is true, render Controller component*/}
      {
        gameStart
          ? <section className="controller">
            <div className="wrapper">
              <Controller hitButton={hitHandler} stayButton={stayHandler} winner={winner} />
            </div>
          </section>
          : null
      }
    </main>
  );
}

export default GameContainer;