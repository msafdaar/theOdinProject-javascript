import '../styles/start.css';
let StartScreen = (props)=>{
    return <div className="startScreen"> 
    <div className="selection">
    <p>Choose a difficulty to start playing</p>
    <div className="difficulty" data-difficulty= "easy" onClick={props.handler}>
    <div className="title">Easy</div>
    <div className="description">Pick  9 items to win</div>
    </div>
    <div className="difficulty" data-difficulty= "normal" onClick={props.handler}>
    <div className="title">Normal</div>
    <div className="description">Pick 16 items to win</div>
    </div>
    <div className="difficulty" data-difficulty= "hard" onClick={props.handler}>
    <div className="title">Hard</div>
    <div className="description">Pick 36 items to win</div>
    </div>
    <label> 
    <input type="checkbox" checked= {props.showThree} onChange={(e)=>{props.setShowThree(e.target.checked)}}></input> 3x3 Display
    </label>
    </div>
    </div>
}

export default StartScreen