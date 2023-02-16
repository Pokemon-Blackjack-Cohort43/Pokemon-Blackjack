import axios from "axios";
import Player from "./Player";
import Controller from "./Controller";
import Instructions from "./Instructions";
import InstructionsContent from "./InstructionsContent";
import Results from "./Results";
import { useState , useEffect } from 'react';
import { logDOM } from "@testing-library/react";


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
  }, []);

  // https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

// API CALL TO GET THE DECK OF CARDS FOR THE HAND
  // state to track card draw and player hand
  const [deck, setDeck] = useState([]);
  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('player one');

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

  console.log(deck);
  
  // create a new deck that has the numeric value of each card as a property of eack card object
  const numericDeck = deck
  numericDeck.forEach((card) => {
    if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK") {
      return card.numValue = 10;  
    } else if (card.value === "ACE") {
      return card.numValue = 11;
    } else {
      return card.numValue = card.value;
    }
  });
  console.log(numericDeck);
  
  
  const currentDeck = numericDeck;

  const startGameHandler = () => {
    setGameStart(!gameStart);

    const check = currentDeck.splice(0, 2);
    const check2 = currentDeck.splice(0, 2);

    setPlayerOneHand(hand => [...hand, check]);
    setPlayerTwoHand(hand => [...hand, check2]);
    console.log(deck);
    
  }

  // on click, add card to player's hand, based on current player
  const hitHandler = () => {
    const check = currentDeck.splice(0, 1);

    if (currentPlayer === "player one") {
      setPlayerOneHand(hand => [...hand, check]);
    } else if (currentPlayer === "player two") {
      setPlayerTwoHand(hand => [...hand, check]);
    }
  }

  console.log('PLAYERHAND ONE', playerOneHand);
  console.log('PLAYERHAND TWO', playerTwoHand);

  // flatten array by one level
  const cardsInHand = playerOneHand.flatMap(item => item);
  console.log(cardsInHand);

  // function for tallying the score of each player's hand
  const cardScore = () => {
    let score = 0;

    }

  const scoreValue = cardScore();
  console.log('score', scoreValue);


  const stayHandler = () => {
    //if pressed by playerOne, setCurrentPlayer(playerTwo)
    //if pressed by playerTwo, compare player scores and pass winner to results for results to display the evolving pokemon
    setCurrentPlayer(currentPlayer === "player one" ? "player two" : "player one");
  }

  return (
        <>
        <Instructions gameState={gameStart}/>

        {/* if game state is false, display 'start game'. else, display 'quit' */}
        <button onClick={startGameHandler} className={gameStart ? 'howToPlayBtn' : null}>
          
            {
                gameStart
                    ? 'quit'
                    : 'start game'}</button>

            {/* display instructions on default. on game start, remove instructions display and display players*/}
            {
                gameStart
                    ? <>
                        <Player pokeData={pokemonPlayerOne} cardData={playerOneHand}/>
                        <Player pokeData={pokemonPlayerTwo} cardData={playerTwoHand}/>
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