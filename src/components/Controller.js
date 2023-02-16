const Controller = (props) => {

        // functions for onClick are located in GameContainer.js and passed down by props

        // when the user clicks the hit button 1 card is dealt

        // when the user clicks the stay button no card is dealt and it is the next players turn
        
    return (
        <>
          <button onClick={props.hitButton}>Hit</button>
          <button onClick={props.stayButton}>Stay</button>
        </>
    )
}

export default Controller;