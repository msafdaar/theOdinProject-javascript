const gameboard = (()=>{

  //default usernames and postitions
  let playerOne = {name: "player1", score: 0, symbol: "X", isComputer: false};
  let playerTwo = {name: "player2", score: 0, symbol: "O", isComputer: false};
  let positions = ["  ","  ","  ","  ","  ","  ","  ","  ","  "];
  let playingNow = playerTwo;
  let gameEnded = true;

  //Start a new round
  let startGame = ()=>{
    gameEnded = false;
    positions = ["","","","","","","","",""];
    playingNow = playerOne;
    displayGameboard();
    displayMessage(`New Round Started.`);
    displayMessage(`${playingNow.name}(${playingNow.symbol}) will choose first.`);  
  }

  //Every time user clicks a cell
  let updateCell = (playerChoice)=>{
    //Start a new round if current round has ended
    if(gameEnded){ 
    startGame()
    } 

    else{
      //Alert users when they try to choose unavailable cell
      if(positions[playerChoice]!=""){
      displayMessage(`Invalid choice, position ${playerChoice * 1 + 1} is already taken.`);  
        
    } else{
      //On a Valid Choice, update [positions], messageBox, and the gameboard in html.
      positions[playerChoice] = playingNow.symbol
      displayMessage(`${playingNow.name} placed an ${playingNow.symbol} at position ${playerChoice * 1 + 1}`);
      displayGameboard();

      //swap players ater valid move
      if (playingNow == playerOne){playingNow = playerTwo}else{playingNow = playerOne};
      
      //Check who will have the next move
      nextMove();
      }
    }  
  }

  //After each valid move, mark the game as ended if winner or tie detected. Announce the outcome in messagebox.
  let nextMove = ()=>{

    //when winner detected, Increase their score and mark game as ended.
    let winner = checkWinner();
    if(winner){
      //decide who is the winning player based on their symbols.
      let winningPlayer;
      if (positions[winner[0]] == playerOne.symbol) {
      winningPlayer = playerOne;
      } else{
      winningPlayer = playerTwo;
      }
      
      //increase their score and mark game as ended
      winningPlayer.score += 1;
      gameEnded = true;

      //Make the text on winning positions lowercase to make it stand out.
      winner.forEach((symbol)=>{positions[symbol] = positions[symbol].toLocaleLowerCase()})

      //announce winner, update scores and gameboard in html
      displayMessage(`${winningPlayer.name}(${winningPlayer.symbol}) has won the round. Click any cell to start next round.`); 
      displayPlayers(); 
      displayGameboard();

    } 

    else if(checkTie()){
      //when tie detected, mark the game as ended and accounce it in messagebox.
      gameEnded = true;
      displayMessage(`This round has finished into a tie. Click any cell to start next round.`);  
    } 
    
    else{
      //When no winners and no ties, Let the next player take their turn.
      displayMessage(`${playingNow.name}(${playingNow.symbol}) will choose now.`);  
    }
  }

  //detects wining cells, returns their index in [position]. returns false if no winner 
  let checkWinner = ()=>{
    let winConditions = [[0,1,2] , [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let result = false;
    winConditions.forEach((condition)=>{
      if(positions[condition[0]] != ""){
      let first = positions[condition[0]];
      let second = positions[condition[1]];
      let third = positions[condition[2]];
      if(first == second && first == third){result = condition}
      }
      })
    return result;
  }

  //Check for a tie
  let checkTie = () =>{
    if(!gameEnded){ //do not check when the game is already marked as ended
      //find empty cells in gameboard. If found, it is not a tie.
      if(positions.some((position)=>{return position == ""})){
      return false
      } else{
      return true
      }
    }
  }

  //When the name in html changes, save it in player objects and announce the change in messagebox
  let changeName = (player) =>{
    let targetPlayer;
    if(player.id == "playerOneName"){
    targetPlayer = playerOne;
    } else{
    targetPlayer = playerTwo;
    }
    let oldName = targetPlayer.name;
    let newName = player.value;
    targetPlayer.name = newName;
    displayMessage(`${oldName}(${targetPlayer.symbol}) changed their name to ${newName}.`);  
  } 

  //Choose a color randomly from the array, assign it to css variable.
  let changeColor = ()=>{
    let colors = [
    "#707070",
    "#000000",
    "#ec008c",
    "#00a651",
    "#00aeef",
    "#0072bc",
    "#662d91",
    "#f26522",
    "#aba000",
    "#bd8cbf",
    "#c69c6d",
    ];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let previousColor = document.querySelector(":root").style.getPropertyValue("--mainColor");
    if(randomColor == previousColor){
    changeColor();
    }else{
    document.querySelector(":root").style.setProperty("--mainColor", randomColor);
    displayMessage(`Theme changed.`);  
    }
  }

  //display the [positions] in html
  let displayGameboard = ()=>{
    let cells = positions.map((cell,index)=>{

      //for normal cells
      let cellClass = "gameboardCell"

      //for used cells
      if(cell != ""){cellClass = "gameboardCell gameboardCellUsed"}

      //for cells in winning combination
      if(cell != "  " && cell != "" && cell == cell.toLocaleLowerCase()){cellClass = "gameboardCell gameboardCellUsed winnerCell"};

      //return a div element with all the required classes
      return `<div class = "${cellClass}" 
      data-position = "${index}" 
      onclick= "gameboard.updateCell(this.getAttribute('data-position'))">${cell}</div>`
    });

    //join all of the divs and display them in gameboard html
    document.getElementById("gameboard").innerHTML =cells.join("");
  };

  //update player divs in html with data from player objects
  let displayPlayers = ()=>{
    document.getElementById("playerOne").innerHTML = `
    <div class="player_symbol">${playerOne.symbol}</div>
    <div class="player_details">
    <input maxlength= "15" onchange="gameboard.changeName(this)" id = "playerOneName" value="${playerOne.name}">
    <div id ="playerOneScore">Score: ${playerOne.score}</div>
    </div>  
    `
    document.getElementById("playerTwo").innerHTML = `
    <div class="player_symbol">${playerTwo.symbol}</div>
    <div class="player_details">
    <input maxlength= "15" onchange="gameboard.changeName(this)" id = "playerTwoName" value="${playerTwo.name}">
    <div id ="playerTwoScore">Score: ${playerTwo.score}</div>
    
    </div>  
    `
    };


  //Make an announcement in messagebox.
  let displayMessage = (message)=>{
    let messageDiv = document.createElement("div");
    messageDiv.innerHTML = `** ${message}`;
    messageDiv.classList.add("gameLogMessage"); //for styles
    messageDiv.classList.add("text-focus-in"); //for animating
    let messageBox = document.getElementById("gameLog");
    messageBox.appendChild(messageDiv);
    messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight; //auto scroll to the end
  }


  //hide or show the messageBox
  let toggelMessages = ()=>{
    let x = document.getElementById("gameLog");
    let y = document.getElementById("gameLogButton");
    if (x.style.display === "none") {
    x.style.display = "flex";
    y.style.marginBottom = "0px";
    let messageBox = document.getElementById("gameLog");
    messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight; //auto scroll to the end
    } else {
    x.style.display = "none";
    y.style.marginBottom = "30px";
    }    
  }

  return{updateCell, displayGameboard, displayPlayers, changeName, changeColor, toggelMessages}
})();

gameboard.displayPlayers();
gameboard.displayGameboard();
// gameboard.toggelMessages();
