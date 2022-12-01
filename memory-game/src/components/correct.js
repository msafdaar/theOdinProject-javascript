import imageLoader from "./imageLoader";
import '../styles/correct.css';

let CorrectScreen = (props)=>{
    setTimeout(props.handler, 500)
    let fruit = props.data.pickedFruits[props.data.pickedFruits.length-1];
    return <div className="correctScreen"> 
    <div>Picked {fruit}</div>
    <div>{imageLoader(fruit)}</div>
    <div className="title">Score++</div>
    
    </div>
}

export default CorrectScreen