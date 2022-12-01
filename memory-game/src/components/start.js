import '../styles/start.css';
let StartScreen = (props)=>{
    return <div className="startScreen"> 
    <div className="selection">
    <p>Choose difficulty to start playing</p>
    <div className="difficulty" data-difficulty= "easy" onClick={props.handler}>
    <div className="title">Easy</div>
    <div className="description">Pick  9 items to win</div>
    </div>
    <div className="difficulty" data-difficulty= "normal" onClick={props.handler}>
    <div className="title">Normal</div>
    <div className="description">Pick 15 items to win</div>
    </div>
    <div className="difficulty" data-difficulty= "hard" onClick={props.handler}>
    <div className="title">Hard</div>
    <div className="description">Pick 30 items to win</div>
    </div>
    </div>
    <p>Rules are simple;</p>
    <p>• Pick fruits and veggies to get score.</p>
    <p>• Do not pick anything twice.</p>
    </div>
}

export default StartScreen