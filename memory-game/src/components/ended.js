let EndedScreen = (props)=>{

    return <div> 
    Your Score: {props.data.score}
    <br></br>
    Picked Twice: {props.data.pickedTwice}
    <br></br>
    <button onClick={props.handler}>Ok</button>
    </div>
}

export default EndedScreen