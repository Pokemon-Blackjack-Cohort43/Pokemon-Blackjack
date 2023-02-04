import axios from "axios";
import Player from "./Player";
import Results from "./Results";
import { useEffect } from 'react';

const GameContainer = () => {

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
  
  
  useEffect(() => {
    


    //axios API call
    axios({
      url: 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      method: `get`,
      dataResponse: `json`
    }).then((response)=> {
      axios({
          url:`https://www.deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/?count=2`,
          method: `get`,
          dataResponse: `json`
        }).then((response)=>{
          console.log(response.data.cards);
          
          
        });
    })


  })

  return(
    <>
      <Player/>
    </>
  )
}

export default GameContainer;