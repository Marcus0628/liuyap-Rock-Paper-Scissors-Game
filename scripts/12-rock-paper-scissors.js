 

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
          playGame('Rock');
        } else if(event.key === 'p'){
          playGame('Paper');
        } else if(event.key === 's'){
          playGame('Scissors');
        }
      });
      
   

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';

        if(playerMove === 'Scissors'){
          if(computerMove === 'Rock'){
            result = 'You Lose.';
          } else if(computerMove === 'Paper'){
            result = 'You Win.';
          } else if(computerMove === 'Scissors'){
            result = 'Tie.';
          }

        } else if (playerMove === 'Paper'){
          if(computerMove === 'Rock'){
            result = 'You Win.';
          } else if(computerMove === 'Paper'){
            result = 'Tie.';
          } else if(computerMove === 'Scissors'){
            result = 'You Lose.';
          }
          
        } else if (playerMove === 'Rock'){
          if(computerMove === 'Rock'){
            result = 'Tie.';
          } else if(computerMove === 'Paper'){
            result = 'You Lose.';
          } else if(computerMove === 'Scissors'){
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
          computerMove = 'Rock';
        } else if(randomNumber >= 1/3 && randomNumber < 2/3) {
          computerMove = 'Paper';
        } else if(randomNumber >= 2/3 && randomNumber < 1) {
          computerMove = 'Scissors';
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
        playGame('Rock');
      });

      document.querySelector('.js-paper-button')
      .addEventListener('click', ()=>{
        playGame('Paper');
      });
 
      document.querySelector('.js-scissors-button')
      .addEventListener('click', ()=>{
        playGame('Scissors');
      });

      document.querySelector('.js-reset-button')
      .addEventListener('click', ()=>{
        resetScores();
      });

      document.querySelector('.js-auto-play-button')
      .addEventListener('click', ()=>{
        autoPlay();
      });

  