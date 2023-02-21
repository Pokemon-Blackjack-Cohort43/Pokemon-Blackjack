const Controller = ({hitButton, stayButton, winner}) => {

        // functions for onClick are located in GameContainer.js and passed down by props

        // when the user clicks the hit button 1 card is dealt

        // when the user clicks the stay button no card is dealt and it is the next players turn
        
    return (
        <>
          <button onClick={hitButton} disabled={winner !== 'none'}>Hit</button>
          {/* <button onClick={addOne}>add 1</button> */}
        <button onClick={stayButton} disabled={winner !== 'none'}>Stay</button>
        </>
    )
}

export default Controller;