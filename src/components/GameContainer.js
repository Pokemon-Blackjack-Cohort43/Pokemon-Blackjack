import axios from "axios";
import Player from "./Player";
import Controller from "./Controller";
import Instructions from "./Instructions";
import Results from "./Results";
import { useState , useEffect } from 'react';


const GameContainer = () => {

  // state to track game start
  const [ gameStart, setGameStart] = useState(false);

  // PUESDDO CODE:

  // API calls wrapped in useEffect to request data and save the response into state that will be passed down to corresponding components as props

  // handleClick functions that will be passed to our Controller.js buttons as props

  // function for determining the total of PlayerCards array and comparing them
    // when there is a winner render Results.js component of corresponding player
    // updates piece of state {winningPokemonId} adds 1 and calls the pokemon API with that id in the params 

  console.log('GameContainer has mounted');

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

  // random generator to select random pokemon set
  const randomizer = (randomPokemon) => {
    // select random index
    const randomIndex = Math.floor(Math.random() * randomPokemon.length);

    const item = randomPokemon[randomIndex]

    return item
  }
  console.log(pokemonPool.length)

  // randomly generates from available Pokemon Pool
  const randomPokemonSelection = randomizer(pokemonPool);
  console.log('random', randomPokemonSelection);


  // when random pokemon ID is generated, put in API to get info;
  useEffect(() => {

    // axios API call
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/${randomPokemonSelection[0]}`,
      method: `get`,
      dataResponse: `json`
    }).then((res) => {
      console.log(res.data.sprites.front_default,
        res.data.name);
    })
      .catch((err) => {
        console.log("error", err.message);
      })
  }, []);



  // https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
  
  // state to track card draw and player hand
  const [cardDraw, setCardDraw] = useState('');
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(() => {

    axios({
      url: `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
      method: `get`,
      dataResponse: `json`
    }).then((res) => {
      axios({
        url: `https://www.deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/`,
        method: `get`,
        dataResponse: `json`,
        params: {
          count: cardDraw
        }
      }).then((response) => {
        console.log('response', response.data.cards);
        // add new drawn card to current cards array in playerHand
        setPlayerHand(hand => [...hand, response.data.cards]);
      }).catch((err) => {
        console.log("error", err.message);
      })
    })
  }, [cardDraw]);

  const drawOneCardHandler = () => {
    setCardDraw(1);
  }

  console.log('PLAYERHAND', playerHand);

  const drawTwoCardHandler = () => {
    setCardDraw(2);
  }

  // flatten array by one level
  const cardsInHand = playerHand.flatMap(item => item);
  console.log(cardsInHand);

  // calculate score of cards in hand
  const cardScore = () => {
    let score = 0;

    const faceCards = ['QUEEN', 'KING', 'JACK'];

    // provided numerical values to face cards
    for (let cards of cardsInHand) {
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

  const scoreValue = cardScore();
  console.log('score', scoreValue);



  return(
    <>
      <Instructions setGameStart={ setGameStart } gameStart= { gameStart }/>

      {/* need separate container to show when game state is true */}
      <Player />
      <Controller />
      <Results />
      <button onClick={drawOneCardHandler}>add one</button>
      <button onClick={drawTwoCardHandler}>add two</button>
    </>
  )
}

export default GameContainer;