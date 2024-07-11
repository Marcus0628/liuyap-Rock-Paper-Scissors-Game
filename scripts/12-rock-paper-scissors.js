 

      let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0,
      };


      updateScoreElement(); 


      /*
      if(!score){
        score = {
          wins: 0,
          losses: 0,
          ties: 0,
        };
      }
      */
      
      document.body.addEventListener('keydown', (event)=>{
        if(event.key === 'r'){
          playGame('rock');
        } else if(event.key === 'p'){
          playGame('paper');
        } else if(event.key === 's'){
          playGame('scissors');
        }
      });
      
   

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';

        if(playerMove === 'scissors'){
          if(computerMove === 'rock'){
            result = 'You Lose.';
          } else if(computerMove === 'paper'){
            result = 'You Win.';
          } else if(computerMove === 'scissors'){
            result = 'Tie.';
          }

        } else if (playerMove === 'paper'){
          if(computerMove === 'rock'){
            result = 'You Win.';
          } else if(computerMove === 'paper'){
            result = 'Tie.';
          } else if(computerMove === 'scissors'){
            result = 'You Lose.';
          }
          
        } else if (playerMove === 'rock'){
          if(computerMove === 'rock'){
            result = 'Tie.';
          } else if(computerMove === 'paper'){
            result = 'You Lose.';
          } else if(computerMove === 'scissors'){
            result = 'You Win.';
          }
        }

        if(result === 'You Win.'){
          score.wins += 1;
        } else if (result === 'You Lose.'){
          score.losses += 1;
        } else if (result === 'Tie.'){
          score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));
        
        updateScoreElement();

        document.querySelector('.js-result')
          .innerHTML = result;  

        document.querySelector('.js-moves')
          .innerHTML = `You <img src="img/${playerMove}-emoji.png" class="move-icon"> <img src="img/${computerMove}-emoji.png" class="move-icon"> Computer`; 


          /*
        alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
Wins: ${score.wins}, Lose: ${score.losses}, Ties: ${score.ties}`);
        */

        
      }

      function updateScoreElement(){

        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Lose: ${score.losses}, Ties: ${score.ties}`;

      }

      

      function pickComputerMove() {

        const randomNumber = Math.random();

        let computerMove = '';

        if(randomNumber >= 0 && randomNumber < 1/3){
          computerMove = 'rock';
        } else if(randomNumber >= 1/3 && randomNumber < 2/3) {
          computerMove = 'paper';
        } else if(randomNumber >= 2/3 && randomNumber < 1) {
          computerMove = 'scissors';
        }

        return computerMove;
      }


      function resetScores(){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        updateScoreElement();
        localStorage.removeItem('score');

        //alert('Your scores has been reset.');
      }

      let isAutoPlaying = false;
      let intervalId;

      //arrow function version
      // const autoPlay = () => {

      // }; 


      function autoPlay(){
        const autoplaybutton = document.querySelector('.js-auto-play-button');

        if(!isAutoPlaying){
        autoplaybutton.innerHTML = 'Stop Play'; 
          
        intervalId = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
         }, 1000);
          isAutoPlaying = true;
          
        } else {
          autoplaybutton.innerHTML = 'Auto Play';

          clearInterval(intervalId);
          isAutoPlaying = false;

          }
    
      }



      const rockButton = document.querySelector('.js-rock-button');

      rockButton.addEventListener('click', () => {
        playGame('rock');
      });

      document.querySelector('.js-paper-button')
      .addEventListener('click', ()=>{
        playGame('paper');
      });
 
      document.querySelector('.js-scissors-button')
      .addEventListener('click', ()=>{
        playGame('scissors');
      });

      document.querySelector('.js-reset-button')
      .addEventListener('click', ()=>{
        resetScores();
      });

      document.querySelector('.js-auto-play-button')
      .addEventListener('click', ()=>{
        autoPlay();
      });

  
