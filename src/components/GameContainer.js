import axios from "axios";
import Player from "./Player";
import Controller from "./Controller";
import Instructions from "./Instructions";
import InstructionsContent from "./InstructionsContent";
import Results from "./Results";
import { useState , useEffect } from 'react';


const GameContainer = () => {

  // state to track game start
  const [ gameStart, setGameStart] = useState(false);

  // PUESDDO CODE:

  // API calls wrapped in useEffect to request data and save the response into state that will be passed down to corresponding components as props


  // function for determining the total of PlayerCards array and comparing them
    // when there is a winner render Results.js component of corresponding player
    // updates piece of state {winningPokemonId} adds 1 and calls the pokemon API with that id in the params 

  console.log('GameContainer has mounted');

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

// state for saving poke data to pass to player component as props

// INITIAL POKEMON API CALL
const [pokemonPlayerOne, setPokemonPlayerOne] = useState([]);
const [pokemonPlayerTwo, setPokemonPlayerTwo] = useState([]);

const pokeFam = randomizer(pokemonPool);
const pokeFam2 = randomizer(pokemonPool);

useEffect (() => {
      axios({
        url: `https://pokeapi.co/api/v2/pokemon/${pokeFam[0]}`,
        method: `get`,
        dataResponse: `json`
        }).then((res) => {
            setPokemonPlayerOne(res.data);
        }).catch((err) => {
            console.log("error", err.message);
        })

      axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokeFam2[0]}`,
            method: `get`,
            dataResponse: `json`
        }).then((res) => {
            setPokemonPlayerTwo(res.data);
        })
            .catch((err) => {
            console.log("error", err.message);
        })
  }, [gameStart]);

  // https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

// API CALL TO GET THE DECK OF CARDS FOR THE HAND
  // state to track card draw and player hand
  const [deck, setDeck] = useState([]);
  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('none');

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


  // handleClick functions that will be passed to our Controller.js buttons as props

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
    console.log(deck);
  }
  // const addOneCard = () => {
  //   const check = currentDeck.splice(0, 1);

  //   // setPlayerOneHand(hand => [...hand, check]);

  //   if (currentPlayer === "player one") {
  //     setPlayerOneHand(hand => [...hand, check]);
  //   } else if (currentPlayer === "player two") {
  //     setPlayerTwoHand(hand => [...hand, check]);
  //   }
  // }

  // on click, add two cards to player's hand, based on current player 
  // const addTwoCards = () => {
  //   const check = currentDeck.splice(0, 2);

  //   if (currentPlayer === "player one") {
  //     setPlayerOneHand(hand => [...hand, check]);
  //   } else if (currentPlayer === "player two") {
  //     setPlayerTwoHand(hand => [...hand, check]);
  //   }
  // }

  // // on click, add card to player's hand, based on current player
  
  console.log('PLAYERHAND ONE', playerOneHand);
  console.log('PLAYERHAND TWO', playerTwoHand);
  
  
  // flatten array by one level
  const cardsInHand = playerOneHand.flatMap(item => item);
  console.log(cardsInHand);
  
  // calculate score of cards in hand
  const cardScore = (cardTest) => {
    let score = 0;

    const faceCards = ['QUEEN', 'KING', 'JACK'];
    const updatedDesk = cardTest.flatMap(item => item)
    
    // provided numerical values to face cards
    for (let cards of updatedDesk) {
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
  
  const scoreValue = cardScore(playerOneHand);
  const scoreTwoValue = cardScore(playerTwoHand)
  console.log('score ONE', scoreValue);
  console.log('score TWO', scoreTwoValue);
  
  // if (scoreTwoValue > 21) {
    
    //   //cardWinner(!currentPlayer)
    //   //`${currentPlayer}`
    //   console.log('P2 bust')
    // }
    // if (scoreValue === scoreTwoValue) {
      //   // Its a tie pops up play again
    //   console.log('tie');
    // }
    // if (scoreValue > scoreTwoValue) {
    //   //`${pokemonPlayerOne}`
    //   console.log('p1 win')
    // }
    // if (scoreValue < scoreTwoValue); {
    //   //`${pokemonPlayerTwo}`
    //   console.log('p2 win')
    // } 
    // else (setCardWinner('none'));

    // return cardWinner;
    


    //logic when cards are dealt
    //if score is 21 auto stay
        //if p1 gets
            //setCurrentPlayer(currentPlayer === "player one" ? "player two" : "player one");
    //logic when hit
        //if score is 21 auto stay
        //if score is over 21 auto lose
        //if score
    //Logic when stay
    //P1 score closer to 21 win
        //P2 score closer to 21 win
        //P1 and P2 score same = play again
    //set winner useState -
  
    const [ winner, setWinner ] = useState('none');

    useEffect(() => {
      const test = () => {

        if (scoreValue === 21 ) {
          setCurrentPlayer("player two");
        } else if (scoreTwoValue === 21) {
          setCurrentPlayer("player one");
        }

        if (scoreValue > 21) {
          setWinner("player two");
          alert(`p2 wins. p1 busted`);
        }

        if (scoreTwoValue > 21) {
          setWinner("player one");
          alert(`p1 wins. p2 busted`);
      }
    }
    test();
    }, [playerOneHand, playerTwoHand]);


  const stayHandler = () => {
    if (currentPlayer === "player two") {
      if (scoreValue < scoreTwoValue) {
        setWinner("player two");
        alert(`p2 wins. closer to 21`)
      } else if (scoreValue > scoreTwoValue) { 
          setWinner("player one"); 
          alert(`p1 wins. closer to 21.`) 
        }
      else if (scoreTwoValue === scoreValue) { 
          setWinner("tie"); 
          alert(`tie`);
      }
    } else {setCurrentPlayer(currentPlayer === "player one" ? "player two" : "player one");}
  }
  
  const hitHandler = () => {
    const check = currentDeck.splice(0, 1);
    // setPlayerOneHand(hand => [...hand, check]);
    
    if (currentPlayer === "player one") {
      setPlayerOneHand(hand => [...hand, check]);
    } else if (currentPlayer === "player two") {
      setPlayerTwoHand(hand => [...hand, check]);
    }
  }
  
  const quitHandler = () => {
    setPlayerOneHand([]);
    setPlayerTwoHand([]);
    setGameStart(false);
    setCurrentPlayer('none');
  }
  

  return (
    <>
        <Instructions gameState={gameStart}/>

        {/* if game state is false, display 'start game'. else, display 'quit' */}
        <button onClick={gameStart ? quitHandler : startGameHandler} className={gameStart ? 'howToPlayBtn' : null}>
          
            {
              gameStart
              ? 'quit'
                    : 'start game'}</button>

            {/* display instructions on default. on game start, remove instructions display and display players*/}
            {
                gameStart
                    ? <>
                        <Player pokeData={pokemonPlayerOne} cardData={playerOneHand} cardScore={scoreValue} />
                        <Player pokeData={pokemonPlayerTwo} cardData={playerTwoHand} cardScore={scoreTwoValue} />
                    </>
                    : <InstructionsContent />
            }

            {/* when game state is true, render Controller component*/}
            {
              gameStart 
                ? <Controller hitButton={hitHandler} stayButton={stayHandler}/>
                : null
            }
        </>
    )
}

export default GameContainer;