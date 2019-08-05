const readline = require('readline-sync');

let pokemon = ["BULBASAUR","IVYSAUR","VENUSAUR","CHARMANDER","CHARMELEON","CHARIZARD","SQUIRTLE","WARTORTLE","BLASTOISE","CATERPIE","METAPOD","BUTTERFREE","WEEDLE","KAKUNA","BEEDRILL","PIDGEY","PIDGEOTTO","PIDGEOT","RATTATA","RATICATE","SPEAROW","FEAROW","EKANS","ARBOK","PIKACHU","RAICHU","SANDSHREW","SANDSLASH","NIDORAN","NIDORINA","NIDOQUEEN","NIDORAN","NIDORINO","NIDOKING","CLEFAIRY","CLEFABLE","VULPIX","NINETALES","JIGGLYPUFF","WIGGLYTUFF","ZUBAT","GOLBAT","ODDISH","GLOOM","VILEPLUME","PARAS","PARASECT","VENONAT","VENOMOTH","DIGLETT","DUGTRIO","MEOWTH","PERSIAN","PSYDUCK","GOLDUCK","MANKEY","PRIMEAPE","GROWLITHE","ARCANINE","POLIWAG","POLIWHIRL","POLIWRATH","ABRA","KADABRA","ALAKAZAM","MACHOP","MACHOKE","MACHAMP","BELLSPROUT","WEEPINBELL","VICTREEBEL","TENTACOOL","TENTACRUEL","GEODUDE","GRAVELER","GOLEM","PONYTA","RAPIDASH","SLOWPOKE","SLOWBRO","MAGNEMITE","MAGNETON","FARFETCH'D","DODUO","DODRIO","SEEL","DEWGONG","GRIMER","MUK","SHELLDER","CLOYSTER","GASTLY","HAUNTER","GENGAR","ONIX","DROWZEE","HYPNO","KRABBY","KINGLER","VOLTORB","ELECTRODE","EXEGGCUTE","EXEGGUTOR","CUBONE","MAROWAK","HITMONLEE","HITMONCHAN","LICKITUNG","KOFFING","WEEZING","RHYHORN","RHYDON","CHANSEY","TANGELA","KANGASKHAN","HORSEA","SEADRA","GOLDEEN","SEAKING","STARYU","STARMIE","MR. MIME","SCYTHER","JYNX","ELECTABUZZ","MAGMAR","PINSIR","TAUROS","MAGIKARP","GYARADOS","LAPRAS","DITTO","EEVEE","VAPOREON","JOLTEON","FLAREON","PORYGON","OMANYTE","OMASTAR","KABUTO","KABUTOPS","AERODACTYL","SNORLAX","ARTICUNO","ZAPDOS","MOLTRES","DRATINI","DRAGONAIR","DRAGONITE","MEWTWO","MEW"];

const getRandomWord = (words) => {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

const createHiddenWord = (word) => {
  let hiddenWord = word.split('').map(char => {return '_ '})
  return hiddenWord;
}

const isLetterInWord = (letter, word) => {
  let upperCaseTheirLetter = letter.toUpperCase();
  return word.includes(upperCaseTheirLetter);
}

const replaceMatches = (theirLetter, actualWord, wordHidden) => {
  for (let i = 0; i < actualWord.length; i++) {
    let currChar = actualWord[i];

    if (currChar === theirLetter) {
      wordHidden.splice(i, 1, `${currChar}`);
    }
  }
  return wordHidden;
}

const intro = () => {
  let userName = readline.question('Whats your name trainer... ? \n');
  console.log('Hello ' + userName + '!');

  startGame();
}

const startGame = () => {
  let randomWord = getRandomWord(pokemon);
  let hiddenWord = createHiddenWord(randomWord);
  let lives = 6;

  while(lives > 0 && hiddenWord.join('') !== randomWord) {
    console.log('Lives left: ', lives);
    console.log('===============');
    console.log(randomWord);
    console.log(hiddenWord.join(''));

    let answer = readline.question('Type a Letter: ');
      let upperCaseAnswer = answer.toUpperCase();
    if (isLetterInWord(upperCaseAnswer, randomWord)) {
      console.log('Found Letter')
      replaceMatches(upperCaseAnswer, randomWord, hiddenWord);
    } else {
      lives--;
      console.log('Wrong Letter')
    }

    console.log('You typed => ', upperCaseAnswer);
  }
}

intro();
