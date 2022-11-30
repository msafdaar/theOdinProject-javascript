let CorrectScreen = (props)=>{
    setTimeout(props.handler, 500)
    return <div> 
    picked {props.data.pickedFruits[props.data.pickedFruits.length-1]}
    </div>
}

export default CorrectScreen