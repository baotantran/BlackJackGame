//
// Black Jack Game
//

// Card Variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven',
'Six', 'Five', 'Four', 'Three', 'Two']

// DOM Variables
let textArea = document.getElementById('text-area');
let newGame = document.getElementById('new-game');
let hit = document.getElementById('hit-button');
let stay = document.getElementById('stay-button');

// Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck= [];

// The start of the game
hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

// New game start
newGame.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = makeDeck(suits, values);
  suffleDeck(deck);
  playerCards = [getNextCard(), getNextCard()];
  dealerCards = [getNextCard(), getNextCard()];
  
  newGame.style.display = 'none';
  textArea.innerText = 'Started!';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
  updateScore();
  if (playerScore === 21) {
    gameOver = true;
    playerWon = true;
  } else if (dealerScore === 21) {
    gameOver = true;
    playerWon = false;
  }
  showStatus();
})

hit.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkEndOfGame();
  showStatus();
})

stay.addEventListener('click', function() {
  gameOver = true;
  checkEndOfGame();
  showStatus();
})

function checkEndOfGame() {
  updateScore();
  if (gameOver) {
    while(dealerScore < playerScore && 
    dealerScore <= 21 && playerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScore();
    }
  }
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
      if (dealerScore > playerScore) {
        playerWon = false;
      } else {
        playerWon = true;
      }
  }
  
  
  
}

function makeDeck(suits, values) {
  let deck = [];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      let card = {
        suit: suits[suitIndex],
        value: values[valueIndex]
      };
      deck.push(card);
    }
  }
  return deck;
}

// Get the next card
function getNextCard() {
  return deck.shift();
}

// Suffle the deck
function suffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let current = deck[i];
    let next = Math.trunc(Math.random() * 51);
    deck[i] = deck[next];
    deck[next] = current;
  }
}

// Get the string name of the card
function getCardString(card) {
  return card.value + " of " + card.suit;
}

// Show current card, score
function showStatus() {
  if(!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }
  
  let dealerCardsString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardsString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardsString += getCardString(playerCards[i]) + '\n'; 
  }
  
  updateScore();
  
  textArea.innerText = 
    'Dealer has:\n' +
    dealerCardsString +
    '(Score: ' + dealerScore + ')' + '\n\n' +
    
    'Player has:\n' +
    playerCardsString +
    '(Score: ' + playerScore + ')' + '\n\n';
  if (gameOver) {
    if (playerWon) {
      textArea.innerText += 'YOU WIN!';
    } else {
      textArea.innerText += 'DEALER WINS';
    }
    newGame.style.display = 'inline';
    hit.style.display = 'none';
    stay.style.display = 'none';
  }
}

// Update the score
function updateScore() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

// Calculate the score
function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for(let i = 0; i < cardArray.length; i++) {
    score += getCardValue(cardArray[i].value);
    if(cardArray[i].value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    score += 10;
  } else if (hasAce && score + 9 <= 21) {
    score += 9;
  }
  return score;
}

// Translate letter into numerical value
function getCardValue(value) {
  switch(value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}



