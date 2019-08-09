const readline = require('readline-sync');
const textArt = require('./textart.js');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let pokemon = ["BULBASAUR","IVYSAUR","VENUSAUR","CHARMANDER","CHARMELEON","CHARIZARD","SQUIRTLE","WARTORTLE","BLASTOISE","CATERPIE","METAPOD","BUTTERFREE","WEEDLE","KAKUNA","BEEDRILL","PIDGEY","PIDGEOTTO","PIDGEOT","RATTATA","RATICATE","SPEAROW","FEAROW","EKANS","ARBOK","PIKACHU","RAICHU","SANDSHREW","SANDSLASH","NIDORAN","NIDORINA","NIDOQUEEN","NIDORAN","NIDORINO","NIDOKING","CLEFAIRY","CLEFABLE","VULPIX","NINETALES","JIGGLYPUFF","WIGGLYTUFF","ZUBAT","GOLBAT","ODDISH","GLOOM","VILEPLUME","PARAS","PARASECT","VENONAT","VENOMOTH","DIGLETT","DUGTRIO","MEOWTH","PERSIAN","PSYDUCK","GOLDUCK","MANKEY","PRIMEAPE","GROWLITHE","ARCANINE","POLIWAG","POLIWHIRL","POLIWRATH","ABRA","KADABRA","ALAKAZAM","MACHOP","MACHOKE","MACHAMP","BELLSPROUT","WEEPINBELL","VICTREEBEL","TENTACOOL","TENTACRUEL","GEODUDE","GRAVELER","GOLEM","PONYTA","RAPIDASH","SLOWPOKE","SLOWBRO","MAGNEMITE","MAGNETON","FARFETCH'D","DODUO","DODRIO","SEEL","DEWGONG","GRIMER","MUK","SHELLDER","CLOYSTER","GASTLY","HAUNTER","GENGAR","ONIX","DROWZEE","HYPNO","KRABBY","KINGLER","VOLTORB","ELECTRODE","EXEGGCUTE","EXEGGUTOR","CUBONE","MAROWAK","HITMONLEE","HITMONCHAN","LICKITUNG","KOFFING","WEEZING","RHYHORN","RHYDON","CHANSEY","TANGELA","KANGASKHAN","HORSEA","SEADRA","GOLDEEN","SEAKING","STARYU","STARMIE","MR. MIME","SCYTHER","JYNX","ELECTABUZZ","MAGMAR","PINSIR","TAUROS","MAGIKARP","GYARADOS","LAPRAS","DITTO","EEVEE","VAPOREON","JOLTEON","FLAREON","PORYGON","OMANYTE","OMASTAR","KABUTO","KABUTOPS","AERODACTYL","SNORLAX","ARTICUNO","ZAPDOS","MOLTRES","DRATINI","DRAGONAIR","DRAGONITE","MEWTWO","MEW"];

let starterPokemon = ['BULBASAUR', 'CHARMANDER', 'SQUIRTLE']
let trainersPokemon = [];
let gymsPokemon = [pokemon[Math.floor(Math.random() * pokemon.length)], pokemon[Math.floor(Math.random() * pokemon.length)]];
let rivalsPokemon = [pokemon[Math.floor(Math.random() * pokemon.length)], pokemon[Math.floor(Math.random() * pokemon.length)], pokemon[Math.floor(Math.random() * pokemon.length)]];
let battles = 1;

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

const startMenu = () => {
  let mainMenu = textArt.startMenu();
  console.log('                        ■■■■■■■■■■■■■■■■■■■■■■');
  let clickedEnter = readline.question(`                  █■■■■■ Click Enter To Start ■■■■■█`, {hideEchoBack: true, mask: ''});

  if (clickedEnter !== undefined) {
    console.clear();
    intro();
  }
}

const intro = () => {
  let professor = textArt.professorHair();

  readline.question(`Hi, my name is Professor Hair. I'm this town's lead researcher on Pokemon.`, {hideEchoBack: true, mask: ''});
  let trainerName = readline.question(`First, what's your name? \n`);
  console.log(`Right! So your name is ${trainerName}!`);

  let rivalName = readline.question(`My grandson has been your rival forever. What was his name again? \n`);
  console.log(`That's Right! I remember now! His name is ${rivalName}!`);

  readline.question(`Alright ${trainerName} follow me to my lab and we'll get you started!`, {hideEchoBack: true, mask: ''});
  console.clear();

  let selectPokemon = textArt.pokemonSelection();

  readline.question(`So lets select your very first pokemon!`, {hideEchoBack: true, mask: ''});
  let index = readline.keyInSelect(starterPokemon, 'You can pick Bulbasaur, Charmander, or Squirtle. Who will you choose?');

  if (starterPokemon[index] === 'BULBASAUR') {
    textArt.bulbasaur();
  } else if (starterPokemon[index] === 'CHARMANDER') {
    textArt.charmander();
  } else if (starterPokemon[index] === 'SQUIRTLE') {
    textArt.squirtle();
  } else {
    process.exit();
  }

  readline.question(`Ok, ${starterPokemon[index]} is a great choice`, {hideEchoBack: true, mask: ''});

    trainersPokemon.push(starterPokemon[index]);

  console.clear();
  let hairTown = textArt.homeTown();
  readline.question(`${trainerName} your very own pokemon adventure is about to unfold!\nPress enter to begin`, {hideEchoBack: true, mask: ''});
  console.clear();

  startGame();
}

const startGame = () => {

  let gameWord = pokemon[Math.floor(Math.random() * pokemon.length)];
  let randomWord = new Word(gameWord);
  lives = 6;
  // console.log(battles);
  if (battles === 3) {

    let theWild = textArt.forest();
    console.log('Searching for Adventure...');
    sleep(Math.floor(Math.random() * 10000)).then(() => {
      console.clear();
      textArt.trainer();
      readline.question(`You entered a Gym, time to get your first badge!`, {hideEchoBack: true, mask: ''});
      gameRules(randomWord, gameWord)
    });

    } else if (battles === 5){
      let theWild = textArt.forest();
      console.log('Searching for Adventure...');
      sleep(Math.floor(Math.random() * 10000)).then(() => {
        console.clear();
        textArt.trainer();
        readline.question(`Your Rival has challenged you, show him what you've learned!`, {hideEchoBack: true, mask: ''});
        gameRules(randomWord, gameWord);
      })

    } else {
      let theWild = textArt.forest();
      console.log('Searching for Adventure...');
      sleep(Math.floor(Math.random() * 10000)).then(() => {
        console.clear();
        textArt.trainer();
        readline.question(`You found a wild Pokemon, prepare for battle!`, {hideEchoBack: true, mask: ''});
        console.clear();
        gameRules(randomWord, gameWord);
      })
  }
  // console.log('Your pokemon ' + trainersPokemon);
  // console.log('Current Wild Pokemon ' + gameWord);
  // console.log('Gyms pokemon ' + gymsPokemon)
  // console.log('Rivals Pokemon ' + rivalsPokemon)
}

// Heart of the gameplay code
const gameRules = (theirGuess, actualWord) => {

  theirGuess.populateArray();
  let guessArr = [];

while(lives > 0) {
  let letterWordArr = [];
  if (battles === 5) {
    textArt.rival();
  } else if (battles === 3) {
    textArt.gymTrainer();
  } else {
    textArt.whoseThatPokemon();
  }

  console.log('===============');
  console.log('Lives left: ', lives);
  console.log('===============');
  console.log(`Previous selections: ${guessArr.toString()}`);
  // console.log(theirGuess.word);
  console.log(theirGuess.createHiddenString());

  let letterGuess = readline.question('Type a Letter: ');
    let upperCaseAnswer = letterGuess.toUpperCase();
    guessArr.push(upperCaseAnswer);

    theirGuess.checkGuessWord(upperCaseAnswer);

    theirGuess.letterArr.forEach(element => {
      letterWordArr.push(element.letter);//.toUpperCase());
    })

    console.log('===============');
    if (letterWordArr.indexOf(letterGuess.toUpperCase()) > -1) {
          console.clear();
        } else {
          lives--;
          console.clear()
        }

    if (`${letterWordArr.join(' ')} ` === theirGuess.createHiddenString()) {
      console.clear();
      battles += 1;

      if(battles === 5){
        console.clear();
        textArt.victory();
        console.log(`\nCongratulations you've defated your Rival and finished Pokehangmon!\n`)
        process.exit();
      } else {
        console.log(`Congrats you won, the word was ${theirGuess.word}!`)
        startGame();
        break;
      }
    }
  }
}

startMenu();
