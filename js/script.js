(function() {
  
  var newGameButton = document.querySelector('#newGame'),
      startGame = document.querySelector('#startGame'),
      resetGameButton = document.querySelector('#resetGame'),
      info_output = document.querySelector('#info-output'),
      rounds_output = document.querySelector('#rounds-output'),
      result_player = document.querySelector('#player'),
      player_name = document.querySelector('#player-name'),
      result_computer = document.querySelector('#comp'),
      playerButtons = document.querySelectorAll('.player-move'),
      modal_winner = document.querySelector('#modal-winner'),
      modal_start = document.querySelector('#modal-start'),
      close_modal = document.querySelector('#close_modal'), 
      winner = document.querySelector('#winner-output'),
      overlay = document.querySelector('.overlay'),
      input_player,
      input_rounds;
  
  var params = {
    playerName: 'Gracz',
    playerWins: 0,
    computerWins: 0,
    roundsToWin: 0,
    stopGame: null,
    computerMove: null,
    playerMove: null
  };
  
  // Loop through all player buttons, and getAttribute data of clicked button
  for(var i=0;i<playerButtons.length;i++) {
      playerButtons[i].addEventListener('click', function() {
        params.playerMove = this.getAttribute('data-move');
        if(params.stopGame === 1) {
          if(params.playerMove === 'Paper') {
            checkResult('Paper');
          } else if (params.playerMove === 'Rock') {
            checkResult('Rock');
          } else if (params.playerMove === 'Scissors'){
            checkResult('Scissors');
          }
        }
      });
  }
 
 // Reset all content and variables:
  function resetAll() {
      displayMsg('');
      player_name.innerHTML = 'Gracz';
      info_output.innerHTML = '';
      rounds_output.innerHTML = 0;
      result_player.innerHTML = 0;
      result_computer.innerHTML = 0;
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
    input_player = document.querySelector('#inputP').value;
    input_rounds = document.querySelector('#inputR').value;
    // attach name player to player_name
    if(input_player !== '') {
      player_name.innerHTML = input_player;
    } 
    // attach values to params object
    params.playerName = input_player;
    params.roundsToWin = input_rounds;
    // display rounds to finish the game
    rounds_output.innerHTML = params.roundsToWin;
    
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
    modal_start.classList.add('show');
    overlay.classList.add('show');
    resetAll();
  }
  
  // Trigger startModal function
  newGameButton.addEventListener('click', startModal);

  // Show player and computer points
  function showResult() {
    result_player.innerHTML = params.playerWins;
    result_computer.innerHTML = params.computerWins;
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
      playerMove();
    }
    
  }
  
  function playerMove() {
    function number() {
      // Attach number to variable 
      var randomNumber = Math.floor((Math.random() * 3) + 1);  
      
      if(randomNumber === 1) {
        params.computerMove = 'Paper';
      } else if (randomNumber === 2) {
        params.computerMove = 'Rock';
      } else if (randomNumber === 3) {
        params.computerMove = 'Scissors';
      }
    };
    
    number();
    
    if(params.stopGame === 1) {
      if(params.computerMove === params.playerMove) {
        displayMsg('draw');
      } else if ((params.computerMove === 'Paper' && params.playerMove === 'Rock') || 
                (params.computerMove === 'Rock' && params.playerMove === 'Scissors') || 
                (params.computerMove === 'Scissors' && params.playerMove === 'Paper')) 
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
      info_output.innerHTML = '<p>' + params.playerName + ' won the game!' + '</p>';
    } else if (type === 'compWin') {
      info_output.innerHTML = '<p>' + 'Computer won the game!' + '</p>';
    } else {
      info_output.innerHTML = '<p>' + 'There is a draw! Play again!' + '</p>';
    }
  }
  
  function showModal(type) {
    overlay.classList.add('show');
    modal_winner.classList.add('show');
    if(type === 'playerWin') {
      if(input_player.length !== 0) {
        winner.innerHTML = '<p>' + params.playerName + ' ,YOU WON THE ENTIRE GAME!' + '</p>' + '<br>';
      } else {
        winner.innerHTML = '<p>' + 'PLAYER WON THE ENTIRE GAME!' + '</p>' + '<br>';
      }
    } else {
      winner.innerHTML = '<p>' + 'COMPUTER WON THE ENTIRE GAME!' + '</p>' + '<br>';
    }
  }
  
  function closeModal() {
    modal_winner.classList.remove('show');
    modal_start.classList.remove('show');
    overlay.classList.remove('show');
  }
  
  // close modal window by click on button or dark overlay
  close_modal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
})();