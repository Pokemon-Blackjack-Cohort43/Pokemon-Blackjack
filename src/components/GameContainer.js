import axios from "axios";
import Player from "./Player";
import Controller from "./Controller";
import Instructions from "./Instructions";
import Results from "./Results";
import { useState , useEffect } from 'react';


const GameContainer = () => {

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
  

  // Deck id state - gets updated by deck api deal call and then used in hit api call to ensure playing cards from the same virtual deck
  const [deck, setDeck] = useState('');




  // Dealing api call
  useEffect(() => {
    


    //axios API call
    axios({
      url: 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      method: `get`,
      dataResponse: `json`
    }).then((response)=> {
      axios({
          url:`https://www.deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/?count=52`,
          method: `get`,
          dataResponse: `json`
        }).then((response)=>{
          console.log(response.data.cards);
          setDeck(response.data.deck_id);
          
        });
    })


  }, [])

  // Hit api call
  useEffect((deckId, numOfCards)=>{
    axios({
      url: `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numOfCards}`,
      method:'get',
      dataResponse:'json'
    }).then((res)=>{
      console.log(res);
    })
  })



  return(
    <>
      <Instructions />
      <Player />
      <Controller />
      <Results />
    </>
  )
}

export default GameContainer;