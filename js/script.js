(function() {
  
  var newGameButton = document.querySelector('#newGame'),
      startGame = document.querySelector('#startGame'),
      resetGameButton = document.querySelector('#resetGame'),
      infoOutput = document.querySelector('#info-output'),
      roundsOutput = document.querySelector('#rounds-output'),
      resultPlayer = document.querySelector('#player'),
      playerName = document.querySelector('#player-name'),
      resultComputer = document.querySelector('#comp'),
      playerButtons = document.querySelectorAll('.player-move'),
      modalWinner = document.querySelector('#modal-winner'),
      modalStart = document.querySelector('#modal-start'),
      modalClose = document.querySelector('#close_modal'), 
      winner = document.querySelector('#winner-output'),
      overlay = document.querySelector('.overlay'),
      inputPlayer,
      inputRounds,
      playerMove,
      computerMove;
  
  var params = {
    playerName: 'Gracz',
    playerWins: 0,
    computerWins: 0,
    roundsToWin: 0,
    stopGame: null
  };
  
  // Loop through all player buttons, and getAttribute data of clicked button
  for(var i=0;i<playerButtons.length;i++) {
      playerButtons[i].addEventListener('click', function() {
        playerMove = this.getAttribute('data-move');
        if(params.stopGame === 1) {
          if(playerMove === 'Paper') {
            checkResult(playerMove);
          } else if (playerMove === 'Rock') {
            checkResult(playerMove);
          } else if (playerMove === 'Scissors'){
            checkResult(playerMove);
          }
        }
      });
  }
 
 // Reset all content and variables:
  function resetAll() {
      displayMsg('');
      playerName.innerHTML = 'Gracz';
      infoOutput.innerHTML = '';
      roundsOutput.innerHTML = 0;
      resultPlayer.innerHTML = 0;
      resultComputer.innerHTML = 0;
      params.playerWins = 0;
      params.computerWins = 0;
      params.roundsToWin = 0;
      params.stopGame = null;
  };
  
  // Trigger resetAll function
  resetGameButton.addEventListener('click', function() {
    var conf = confirm('Are you sure?');
    if(conf) {
      resetAll();
    }
  });
  
  var callNewGame = function() {
    // take values from inputs
    inputPlayer = document.querySelector('#inputP').value;
    inputRounds = document.querySelector('#inputR').value;
    // attach name player to playerName
    if(inputPlayer !== '') {
      playerName.innerHTML = inputPlayer;
    } 
    // attach values to params object
    params.playerName = inputPlayer;
    params.roundsToWin = inputRounds;
    // display rounds to finish the game
    roundsOutput.innerHTML = params.roundsToWin;
    
    if(params.stopGame === 0) {
      resetAll();
    }

    params.stopGame = 1; // set to 1, now game is possible
    closeModal();
  };
  
  // Trigger callNewGame function
  startGame.addEventListener('click', callNewGame);
  
  function startModal() {
    // open modal box
    modalStart.classList.add('show');
    overlay.classList.add('show');
    resetAll();
  }
  
  // Trigger startModal function
  newGameButton.addEventListener('click', startModal);

  // Show player and computer points
  function showResult() {
    resultPlayer.innerHTML = params.playerWins;
    resultComputer.innerHTML = params.computerWins;
  }
  
  // Compare gained points to rounds, and decide who wins the game
  function checkResult(pMove) {
   
    if(params.playerWins >= params.roundsToWin) {
      showModal('playerWin');
      params.stopGame = 0;
    } else if(params.computerWins >= params.roundsToWin) {
      showModal('compWin');
      params.stopGame = 0;
    } else {
      gamerMove();
    }
    
  }
  
  function gamerMove() {
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
    
    if(params.stopGame === 1) {
      if(computerMove === playerMove) {
        displayMsg('draw');
      } else if ((computerMove === 'Paper' && playerMove === 'Rock') || 
                (computerMove === 'Rock' && playerMove === 'Scissors') || 
                (computerMove === 'Scissors' && playerMove === 'Paper')) 
      {
        displayMsg('compWin');
        params.computerWins++;
        showResult();
      } else {
        displayMsg('playerWin');
        params.playerWins++;
        showResult();
      }
    } 
  }
  
  // Show results of game on the page
  function displayMsg(type) {
    if(type === 'playerWin') {
      infoOutput.innerHTML = '<p>' + params.playerName + ' won the game!' + '</p>';
    } else if (type === 'compWin') {
      infoOutput.innerHTML = '<p>' + 'Computer won the game!' + '</p>';
    } else {
      infoOutput.innerHTML = '<p>' + 'There is a draw! Play again!' + '</p>';
    }
  }
  
  function showModal(type) {
    overlay.classList.add('show');
    modalWinner.classList.add('show');
    if(type === 'playerWin') {
      if(inputPlayer.length !== 0) {
        winner.innerHTML = '<p>' + params.playerName + ' ,YOU WON THE ENTIRE GAME!' + '</p>' + '<br>';
      } else {
        winner.innerHTML = '<p>' + 'PLAYER WON THE ENTIRE GAME!' + '</p>' + '<br>';
      }
    } else {
      winner.innerHTML = '<p>' + 'COMPUTER WON THE ENTIRE GAME!' + '</p>' + '<br>';
    }
  }
  
  function closeModal() {
    modalWinner.classList.remove('show');
    modalStart.classList.remove('show');
    overlay.classList.remove('show');
  }
  
  // close modal window by click on button or dark overlay
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
})();