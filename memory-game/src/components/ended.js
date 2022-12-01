import imageLoader from "./imageLoader";
import '../styles/ended.css';

let EndedScreen = (props)=>{
    let fruit = props.data.pickedTwice;
    return <div className="endedScreen"> 
    <div>Oh no! you picked {fruit} twice.</div>
    <div>{imageLoader(fruit)}</div>
    <div className="title">Game Over</div>
    <div className="score">
    Your Score: {props.data.score}
    </div>
    <button onClick={props.handler}>Play Again</button>
    </div>
}

export default EndedScreen