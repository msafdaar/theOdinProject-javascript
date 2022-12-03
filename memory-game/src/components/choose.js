import getUniqueRandoms from "./uniqueRandoms";
import imageLoader from "./imageLoader";
import '../styles/choose.css';

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
    
    let styleClass = ""
    if(props.showThree){
        styleClass = "threeByThree"
        //select 8 more fruits from mixed array
        arrayForRender = arrayForRender.concat(getUniqueRandoms(mixedArray,8));
        //shuffle the array again
        arrayForRender = getUniqueRandoms(arrayForRender,9)
    
    } else{
        arrayForRender = arrayForRender.concat(mixedArray);
        arrayForRender = getUniqueRandoms(arrayForRender,arrayForRender.length)
        if(arrayForRender.length === 9){
                styleClass = "threeByThree";
        } else if(arrayForRender.length === 16){
                styleClass = "fourByFour";
        } else if(arrayForRender.length === 36){
                styleClass = "sixBySix";
        }    
    }
    return <div className={`chooseScreen ${styleClass}`}>
    <div className="imagesContainer">
    {arrayForRender.map((fruit, index)=>{
        return <div className="singleImage" data-fruit-name= {fruit} key={index} onClick={props.handler}>{imageLoader(fruit)}</div>
    }
    )}
    </div>
    <div className="score">
    Your Score: {props.data.pickedFruits.length}
    </div>
    </div>
}

export default ChooseScreen