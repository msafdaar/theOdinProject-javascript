import getUniqueRandoms from "./uniqueRandoms";

let ChooseScreen = (props)=>{
    // console.log(props)
    //make new array to render
    let arrayForRender = [];
    // at least one fruit must be availabe
    arrayForRender = arrayForRender.concat(getUniqueRandoms(props.data.availableFruits,1));
    //make mixed array for picking other 8 fruits   
    let mixedArray = props.data.availableFruits.concat(props.data.pickedFruits)
    //remove already selected fruit from mixed array
    mixedArray = mixedArray.filter(e => e !== arrayForRender[0]);
    //select 8 more fruits from mixed array
    arrayForRender = arrayForRender.concat(getUniqueRandoms(mixedArray,8));

    return <div> 
    This is choose screen
    <br></br>
    Your Score: {props.data.pickedFruits.length}
    {arrayForRender.map((fruit, index)=>{
        return <div 
        data-fruit-name= {fruit} 
        key={index} 
        onClick={props.handler}>{fruit}</div>})}
    </div>
}

export default ChooseScreen