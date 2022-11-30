let StartScreen = (props)=>{
    return <div> 
    Rules <br></br>
    Pick a Fruit to get score.
    Dont Pick any fruit twice.
    <br></br>
    Select a Difficulty to start game
    <br></br>
    <button onClick={props.handler} data-difficulty= "easy">Easy - 9 fruits</button>
    <br></br>
    <button onClick={props.handler} data-difficulty= "normal">Normal - 15 fruits</button>
    <br></br>
    <button onClick={props.handler} data-difficulty= "hard">Hard - 30 fruits</button>

    </div>
}

export default StartScreen