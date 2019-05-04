(function() {
  
  var paperButton = document.querySelector('#btn-1'),
      rockButton = document.querySelector('#btn-2'),
      scissorsButton = document.querySelector('#btn-3'),
      newGameButton = document.querySelector('#newGame'),
      resetGameButton = document.querySelector('#resetGame'),
      info_output = document.querySelector('#info-output'),
      rounds_output = document.querySelector('#rounds-output'),
      result_player = document.querySelector('#player'),
      result_computer = document.querySelector('#comp'),
      playerWins = 0,
      computerWins = 0,
      roundsToWin = 0,
      stopGame;
 
  paperButton.addEventListener('click', function() {
    if(stopGame === 1) {
      checkResult('Paper');
    }
  });
  
  rockButton.addEventListener('click', function() {
    if(stopGame === 1) {
      checkResult('Rock');
    }
  });
  
  scissorsButton.addEventListener('click', function() {
    if(stopGame === 1) {
      checkResult('Scissors'); 
    }
  });
 
 // Reset all content and variables:
  function resetAll() {
      displayMsg('');
      rounds_output.innerHTML = 0;
      result_player.innerHTML = 0;
      result_computer.innerHTML = 0;
      playerWins = 0;
      computerWins = 0;
      roundsToWin = 0;
  };
  
  // Trigger resetAll function
  resetGame.addEventListener('click', function() {
    var conf = confirm('Are you sure?');
    if(conf) {
      resetAll();
    }
  });
  
  var callNewGame = function() {
      if(stopGame === 0) {
        resetAll();
      }
      roundsToWin = prompt('Write number of rounds to finish the game!');
      rounds_output.innerHTML = roundsToWin;
      stopGame = 1; // set to 1, now game is possible
  };
  
  // Trigger callNewGame function
  newGameButton.addEventListener('click', callNewGame);
  
  // Show player and computer points
  function showResult() {
    result_player.innerHTML = playerWins;
    result_computer.innerHTML = computerWins;
  }
  
  // Compare gained points to rounds, and decide who wins the game
  function checkResult(pMove) {
    if(playerWins >= roundsToWin) {
      displayMsg('PLAYER WON THE ENTIRE GAME!');
      stopGame = 0;
    } else if(computerWins >= roundsToWin) {
      displayMsg('COMPUTER WON THE ENTIRE GAME!');
      stopGame = 0;
    } else {
      playerMove(pMove);
    }
  }
  
  function playerMove(pMove) {
    var computerMove;
    function number() {
      // Attach number to variable 
      var randomNumber = Math.floor((Math.random() * 3) + 1);  
      
      if(randomNumber === 1) {
        computerMove = 'Paper';
      } else if (randomNumber === 2) {
        computerMove = 'Rock';
      } else if (randomNumber === 3) {
        computerMove = 'Scissors';
      }
    };
    
    number();
    
    if(stopGame === 1) {
      if(computerMove === pMove) {
        displayMsg('There is no winner. It is a draw!');
      } else if ((computerMove === 'Paper' && pMove === 'Rock') || 
                (computerMove === 'Rock' && pMove === 'Scissors') || 
                (computerMove === 'Scissors' && pMove === 'Paper')) 
      {
        displayMsg('Computer won the game!');
        computerWins++;
        showResult();
      } else {
        displayMsg('Player won the game!');
        playerWins++;
        showResult();
      }
    } 
  }
  
  // Show results of game on the page
  function displayMsg(result) {
    info_output.innerHTML = '<p>' + result + '</p>';
  }
  
})();