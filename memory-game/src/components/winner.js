let WinnerScreen = (props)=>{
    return <div> 
    You win!
    <br></br>
    You picked all {props.data.pickedFruits.length} fruits.
    <br></br>
    <button onClick={props.handler}>Ok</button>
    </div>
}

export default WinnerScreen