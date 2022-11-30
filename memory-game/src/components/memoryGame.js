import { useState } from "react";
import StartScreen from "./start";
import ChooseScreen from "./choose";
import getUniqueRandoms from "./uniqueRandoms";
import EndedScreen from "./ended";
import CorrectScreen from "./correct";
import WinnerScreen from "./winner";

const MemoryGame = ()=>{
    // let allFruits = ["a","b","c","d","e","f","g","h","i", "j"];
    // let pickedFruits = [""];
    // let availableFruits = allFruits.slice();
    
    let [gameData, setGameData] = useState({screen:"start"});
      
    let startGame = (e)=>{
        //assign available fruits according to difficulty selected.
        let difficulty = e.target.dataset.difficulty;
        let fruitsQty = 0;
        if(difficulty === "easy"){
            fruitsQty = 9;
        }else if(difficulty === "normal"){
            fruitsQty = 15;
        } else if(difficulty === "hard"){
            fruitsQty = 30;
        }

        let allFruits = ["mango","banana","orange","chili","salt","fish","burger","eggs","peas","gajaar","aloo","amatar","gobhi","roti","bread","butter","doodh","dahi","watermelon","chicken","dog","pig","beef"];
        let availableFruits = getUniqueRandoms(allFruits, fruitsQty)
        let pickedFruits = [];
        let screen = "choose";
        setGameData({screen,availableFruits,pickedFruits})
    }


    let fruitChoosen = (e)=>{
       let choice = e.target.dataset.fruitName;
       //on correct choice
       //move the fruit from available to picked, update state and show choose screen again
        if(gameData.availableFruits.indexOf(choice) !== -1){
            //if no choices left, announce winner
            if(gameData.availableFruits.length === 1){
                let pickedFruits = gameData.pickedFruits.concat([choice])
                setGameData({screen: "winner", pickedFruits})
            } 
            else{
                //continue the game
                console.log("Picked "+ choice)
                let pickedFruits = gameData.pickedFruits.slice().concat(choice);
                let availableFruits = gameData.availableFruits.filter(f => f !== choice);
                setGameData({screen: "correct", pickedFruits, availableFruits})


            }
        } else{
        // on wrong choice
        // compare and save high scores. show game end screen.
            console.log("You can't pick "+ choice + " again") 
            let score = gameData.pickedFruits.length;
            let pickedTwice = choice;
            setGameData({screen:"ended", pickedTwice, score})
        }
    }
    
    let startAgain = ()=>{
        //save highscores and start game again.
        setGameData({screen:"start"})
    }

    let chooseAgain = ()=>{
        let pickedFruits = gameData.pickedFruits;
        let availableFruits = gameData.availableFruits;
        setGameData({screen: "choose", pickedFruits, availableFruits})
    }
    if(gameData.screen === "start"){
            return <StartScreen handler = {startGame}></StartScreen>
    } else if(gameData.screen === "choose"){
        return <ChooseScreen handler = {fruitChoosen} data = {gameData}></ChooseScreen>
    } else if(gameData.screen === "ended"){
        return <EndedScreen handler = {startAgain} data = {gameData}></EndedScreen>
    } else if(gameData.screen === "correct"){
        return <CorrectScreen handler = {chooseAgain} data = {gameData}></CorrectScreen>
    } else if(gameData.screen === "winner"){
        return <WinnerScreen handler = {startAgain} data = {gameData}></WinnerScreen>
    }
}

export default MemoryGame