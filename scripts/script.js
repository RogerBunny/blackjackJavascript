$(document).ready(function(){
  var cardVal, cardSuite, cardFace, temp, cardsDrawn, newCard, playerScores, playerStand, reButton;

  //Initialize and restarting game commands
  function init(){
    cardsDrawn = [];
    playerScores = [0,0];
    playerStand = [0,0];
    $(".rematchButton").hide();
    $(".dealt").find("span").remove();
    $(".dealt").find("img").remove();
    $(".playerButtons").find(".matchStart").show();
    $("#infop0,#infop1").text('Total points: ');
    $("#pointsp0,#pointsp1").text('0');
    $("#standp0,#standp1").removeClass('standClass');
    //remove following functions if 2 cards do not have to be dealt by default
    hitPlayer(0,1);
    hitPlayer(0,1);
    hitPlayer(1,0);
    hitPlayer(1,0);
  }

  //Returns cardval,cardsuite,cardface (all declared globally)
  function findCard(){
      cardVal = Math.ceil(Math.random()*13); //Value of Cards
      cardSuite = Math.ceil(Math.random()*4); //Suite of Cards
      cardFace = cardVal; //Card Face
      if (cardVal > 10){
        temp = cardVal % 10;
        cardVal = 10;
        switch (temp) {
          case 1 : cardFace = "J";
                break;
          case 2 : cardFace = "Q";
                break;
          case 3 : cardFace = "K";
                break;
          default: console.log("Error at Switch Statements");
        }
      }else if(cardVal === 1){
        cardFace = "A";
      }
      blacklist();
      cardsDrawn.push([cardFace, cardSuite]);
      newCard = $('<span class="cards">'+cardFace+'</span><img class="cardsimg" src="images/'+cardSuite+'.png">');
  }

  //To prevent duplicate cards from being drawn assuming only one deck being used
  function blacklist(){
      var num = cardsDrawn.length;
      for(i = 0; i < num; i++){
        if(cardFace === cardsDrawn[i][0] && cardSuite === cardsDrawn[i][1]){
            findCard();
        }
      }
  }

  //Player hitting cards function
  function playerHit(num){
    text = '#headp'+num;
    $("#blockp"+num).addClass("activeplayer");
    $("#blockp"+num).find(".dealt").append(newCard);
    playerScores[num] += cardVal;
    $("#pointsp"+num).text(playerScores[num]);
  }

  //removing active player css
  function removeActive(num){
      $("#blockp"+num).removeClass("activeplayer");
  }

  //Function implementing winners using different commads
  function declareWinner(num1,num2){
    $("#infop"+num1).text('BUST!!!');
    $("#infop"+num2).text('WINNER!!!');
    $(".playerButtons").find("button").hide();
    $(".rematchButton").show();
  }

  //Function to check the winner
  function checkWinner(num1,num2){
    if(playerScores[num1] > 21){
        declareWinner(num1,num2);
    }
  }

  //Function to stop game if both players stand
  function checkStand(){
    if(playerStand[0] == 1 && playerStand[1] == 1){
      if (playerScores[0] > playerScores[1]){
        declareWinner(1,0);
      } else if(playerScores[1] > playerScores[0]){
        declareWinner(0,1);
      } else{
        $("#infop0,#infop1").text('DRAW!!!');
        $(".playerButtons").find("button").hide();
        $(".rematchButton").show();
      }
    }
  }

  //Functions calls to run game
  function hitPlayer(num1,num2){
    findCard();
    playerHit(num1);
    removeActive(num2);
    checkWinner(num1,num2);
    playerStand[num1] = 0;
    $("#standp"+num1).removeClass('standClass');
  }

  init();

  $("#hitp0").on('click', function(){
    hitPlayer(0,1);
  });

  $("#standp0").on('click', function(){
    removeActive(0);
    playerStand[0] = 1;
    $(this).addClass('standClass');
    checkStand();
  });

  $("#hitp1").on('click', function(){
    hitPlayer(1,0);
  });

  $("#standp1").on('click', function(){
    removeActive(1);
    playerStand[1] = 1;
    $(this).addClass('standClass');
    checkStand();
  });

  $(".rematchButton").on('click', function(){
    init();
  });
});
