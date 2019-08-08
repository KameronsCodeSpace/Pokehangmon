const readline = require('readline-sync');

let pokemon = ["BULBASAUR","IVYSAUR","VENUSAUR","CHARMANDER","CHARMELEON","CHARIZARD","SQUIRTLE","WARTORTLE","BLASTOISE","CATERPIE","METAPOD","BUTTERFREE","WEEDLE","KAKUNA","BEEDRILL","PIDGEY","PIDGEOTTO","PIDGEOT","RATTATA","RATICATE","SPEAROW","FEAROW","EKANS","ARBOK","PIKACHU","RAICHU","SANDSHREW","SANDSLASH","NIDORAN","NIDORINA","NIDOQUEEN","NIDORAN","NIDORINO","NIDOKING","CLEFAIRY","CLEFABLE","VULPIX","NINETALES","JIGGLYPUFF","WIGGLYTUFF","ZUBAT","GOLBAT","ODDISH","GLOOM","VILEPLUME","PARAS","PARASECT","VENONAT","VENOMOTH","DIGLETT","DUGTRIO","MEOWTH","PERSIAN","PSYDUCK","GOLDUCK","MANKEY","PRIMEAPE","GROWLITHE","ARCANINE","POLIWAG","POLIWHIRL","POLIWRATH","ABRA","KADABRA","ALAKAZAM","MACHOP","MACHOKE","MACHAMP","BELLSPROUT","WEEPINBELL","VICTREEBEL","TENTACOOL","TENTACRUEL","GEODUDE","GRAVELER","GOLEM","PONYTA","RAPIDASH","SLOWPOKE","SLOWBRO","MAGNEMITE","MAGNETON","FARFETCH'D","DODUO","DODRIO","SEEL","DEWGONG","GRIMER","MUK","SHELLDER","CLOYSTER","GASTLY","HAUNTER","GENGAR","ONIX","DROWZEE","HYPNO","KRABBY","KINGLER","VOLTORB","ELECTRODE","EXEGGCUTE","EXEGGUTOR","CUBONE","MAROWAK","HITMONLEE","HITMONCHAN","LICKITUNG","KOFFING","WEEZING","RHYHORN","RHYDON","CHANSEY","TANGELA","KANGASKHAN","HORSEA","SEADRA","GOLDEEN","SEAKING","STARYU","STARMIE","MR. MIME","SCYTHER","JYNX","ELECTABUZZ","MAGMAR","PINSIR","TAUROS","MAGIKARP","GYARADOS","LAPRAS","DITTO","EEVEE","VAPOREON","JOLTEON","FLAREON","PORYGON","OMANYTE","OMASTAR","KABUTO","KABUTOPS","AERODACTYL","SNORLAX","ARTICUNO","ZAPDOS","MOLTRES","DRATINI","DRAGONAIR","DRAGONITE","MEWTWO","MEW"];

class Letter {
  constructor(letter, guessed = false) {
    this.letter = letter;
    this.guessed = guessed;
  }

  populateLetter() {
    if (this.guessed) {
      return this.letter + ' ';
    } else {
      return '_ ';
    }
  }

  isGuess(guess) {
    if (guess === this.letter) {
      this.guessed = true;
    }
  }

};

class Word extends Letter {
  constructor(word, letterArr = [], letter, guessed) {
    super(letter, guessed)
    this.word = word;
    this.letterArr = letterArr;
  }

  populateArray() {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word.charAt(i) === ' ') {
        this.letterArr.push(' ');
      } else {
        this.letterArr.push(new Letter(this.word.charAt(i)));
      };
    };
    return this.letterArr;
  };

  createHiddenString() {
    let wordString = '';

    this.letterArr.forEach(el => {
      if (el === ' ') {
        wordString += '  ';
      } else {
        wordString += el.populateLetter();
      }
    });

    return wordString;
  };

  checkGuessWord(guessedLetter) {
    this.letterArr.forEach(el => {
      if (el.guessed === false) {
        el.isGuess(guessedLetter);
      }
    });
  }
};

let lives = 0;

const isLetterInWord = (letter, word) => {
  let upperCaseTheirLetter = letter.toUpperCase();
  return word.includes(letter);
}

const replaceMatches = (theirLetter, actualWord, wordHidden) => {
  for (let i = 0; i < actualWord.length; i++) {
    let currChar = actualWord.charAt(i);
    if (currChar === theirLetter && currChar !== '') {
      hiddenWord.splice(i, 1, theirLetter);
    }
  }
  return;
}

const intro = () => {
  let trainerName = readline.question(`First, what's your name? \n`);
  console.log('Right! So your name is ' + trainerName + '!');

  let rivalName = readline.question(`My grandson has been your rival forever. What was his name again? \n`);
  console.log(`That's Right! I remember now! His name is ${rivalName}!`);

  console.log(`${trainerName} your very own pokemon adventure is about to unfold!`);

  startGame();
}

const startGame = () => {
  let gameWord = pokemon[Math.floor(Math.random() * pokemon.length)];

  let randomWord = new Word(gameWord);

    lives = 6;

  gameRules(randomWord, gameWord);
}

// Heart of the gameplay code
const gameRules = (theirGuess, actualWord) => {

  theirGuess.populateArray();
  let guessArr = [];

while(lives > 0) {
  let letterWordArr = [];

  console.log('===============');
  console.log('Lives left: ', lives);
  console.log('===============');
  console.log(theirGuess.word);
  console.log(theirGuess.createHiddenString());

  let letterGuess = readline.question('Type a Letter: ');
    let upperCaseAnswer = letterGuess.toUpperCase();
    guessArr.push(upperCaseAnswer);

    theirGuess.checkGuessWord(upperCaseAnswer);

    theirGuess.letterArr.forEach(element => {
      letterWordArr.push(element.letter.toUpperCase());
    })

    console.log('===============');
    console.log(`Previous selections: ${guessArr.toString()}`);
    if (letterWordArr.indexOf(letterGuess.toUpperCase()) > -1) {
        console.log('Found Letter');
      } else {
          lives--;
          console.log('Wrong Letter')
        }

    console.log('You typed => ', upperCaseAnswer);

    if (`${letterWordArr.join(' ')} ` === theirGuess.createHiddenString()) {
      console.log('Congrats you won the word was ' + theirGuess.word)
      break;
    }
  }
}

intro();
