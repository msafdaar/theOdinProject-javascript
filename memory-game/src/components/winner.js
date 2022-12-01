import '../styles/winner.css';
let WinnerScreen = (props)=>{
    return <div className='winnerScreen'> 
    <div className='score'>Picked all {props.data.pickedFruits.length} items</div>
    <div className='title'>You Win!</div>
    <button onClick={props.handler}>Play Again</button>
    </div>
}

export default WinnerScreen