(() =>{
const wordlist = `
about other which their there first would these click price
state email world music after video where books links years
order items group under games could great hotel store terms
right local those using phone forum based black check index
being women today south pages found house photo power while
three total place think north posts media water since guide
board white small times sites level hours image title shall
class still money every visit tools reply value press learn
print stock point sales large table start model human movie
march yahoo going study staff again april never users topic
below party login legal above quote story rates young field
paper girls night texas poker issue range court audio light
write offer given files event china needs might month major
areas space cards child enter share added radio until color
track least trade david green close drive short means daily
beach costs style front parts early miles sound works rules
final adult thing cheap third gifts cover often watch deals
words linux james heart error clear makes india taken known
cases quick whole later basic shows along among death speed
brand stuff japan doing loans shoes entry notes force river
album views plans build types lines apply asked cross weeks
lower union names leave teens woman cable score shown flash
ideas allow homes super asian cause focus rooms voice comes
brown forms glass happy smith thank prior sport ready round
built blood earth nokia italy basis award peter extra rated
quite horse stars lists owner takes bring input agent valid
grand trial units wrote ships metal funds guest seems trust
multi grade panel floor match plant sense stage goods maybe
spain youth break dance apple enjoy block civil steel songs
fixed wrong hands paris fully worth peace coast grant agree
blogs scale stand frame chief gives heard begin royal clean
bible suite vegas chris piece sheet seven older cells looks
calls whose naked lives stone tests buyer steve label scott
canon waste chair phase motor shirt crime count claim patch
santa alone jones saint drugs joint fresh dates upper prime
limit began louis steps shops creek urban tours labor admin
heavy solid theme touch goals serve magic mount smart latin
avoid birth virus abuse facts faith chain moved reach sorry
gamma truth films owned draft chart jesus clubs equal codes
kinds teams funny tried named laser harry taxes mouse brain
dream false falls stats carry hello clips brief ended eight
wants alert queen sweet diego truck votes ocean signs depth
train feeds route frank anime speak query rural judge bytes
fight filed korea banks kelly leads brian miami wales minor
noted spent davis helps cycle sleep scene drink intel rings
henry guess ahead devel delta cisco alpha bonus adobe trees
dress refer babes layer spend clock ratio proof empty maine
ideal specs parks cream boxes hills aware shape irish firms
usage mixed exist wheel angel width noise array greek sharp
occur knows coach kevin plate logic sizes plain costa trail
buddy setup blues scope crazy bears mouth meter fruit mysql
lewis sugar stick allen genre slide exact bound storm micro
dolls paint delay pilot czech novel ultra idaho plays truly
lodge broad swiss sarah clark foods guard newly raise drama
bands lunch audit polls tower yours jason shell solar catch
doubt tasks const doors forth bruce split twice egypt shift
simon marks loved birds saved shots moore treat piano risks
ports teach rapid hairy dutch boots holds pulse metro strip
pearl heads logos honda bills opera asset blank humor lived
tight meant plane meets tampa grace susan adams villa inner
roman taste trips sides turns cache lease proud giant seats
alarm usual angle vinyl worst honor eagle pants nurse quiet
comic crown maker crack picks smoke craft apart blind coins
gross epson actor finds fifth prize dirty wayne alive prove
wings ridge modem larry skill moves throw trend rhode worse
boats tells fiber graph talks bonds fraud roger crash inter
grove spray roads faces mayor yield hence radar lakes diary
kings flags baker shock walls ebony drawn beast dodge pizza
yards woods jokes twiki globe dicke kerry ghost pride keith
linda chile maria brass plaza quest trans booty acres venue
vital excel modes enemy wells opens lucky thick iraqi vista
chips terry flood arena grown jerry smile lands armed laura
tokyo nikon candy pills tiger folks boost icons moral keeps
pound roses bread tough gonna chest billy craig solve nancy
tones sight towns worry reads roles glory saudi fault karen
jimmy rugby fluid barry devil grass marie kenya sized manga
theft swing dated shoot elite poems robot winds gnome roots
noble shore loves loose slots rocks genes hosts atlas feels
ralph corps liver decor texts evans fails aging alice intro
clerk mills jeans fonts favor sigma xhtml aside essay camps
aaron trace packs spoke arrow rough weird holes blade meals
robin strap crowd cloud valve knife shelf liked adopt fotos
outer tales islam nodes seeds cited skype tired steam acute
stood carol stack curve amber trunk waves camel lamps juice
chase sauce beads flows fewer proxy lanka voted bikes gates
slave lycos zdnet combo haven charm basin ranch drunk toner
latex delhi alien broke nepal nylon discs rocky fleet bunch
cents omega civic saver grill grain wanna seeks gains spots
salon turbo thats aimed reset brush spare kodak skirt honey
gauge faced sixth farms cheat sandy macro laugh pitch autos
perry dozen teeth cloth stamp lotus cargo salem likes tapes
zones races maple depot blend julie janet phpbb probe helen
lopez debug chuck ebook bingo minds xanax sunny leeds cedar
blair hopes mason burns pumps mario utils pairs chose blast
tommy brake congo olive cyber clone dicks relay tears oasis
angry lover rolls malta daddy ferry omaha loads motel rally
dying stuck stops vocal organ lemon toxic bench rider butts
bobby sheep wines salad paste katie relax sword sells coral
pixel float colin paths acids dairy admit fancy samoa squad
wages males chaos wheat bases unity bride begun socks essex
fever drums rover flame tanks spell emily annex sudan hints
wired elvis argue arise jamie chess oscar menus canal amino
herbs lying drill bryan hobby tries trick myers drops wider
screw blame fifty uncle jacob randy brick naval donna cabin
eddie fired perth syria klein tires retro anger suits glenn
handy crops guild tribe batch alter ghana edges twins amend
chick thong medal walks booth indie bones breed polar msgid
carey danny patio lloyd beans ellis snake julia berry ought
fixes sends mazda timer tyler verse highs ellen racks nasty
tumor watts forty tubes floyd queue skins exams welsh belly
haiti elder sonic thumb twist ranks debut volvo penny ivory
remix alias newer spice ascii donor trash manor diane disco
endif minus milan shade digit lions pools lyric grave howto
devon saves lobby punch gotta karma betty lucas mardi shake
holly silly mercy fence diana shame fatal flesh jesse qatar
sheer witch cohen puppy kathy smell satin promo tunes lucia
nerve renew locks euros rebel hired hindu kills slope nails
whats rides rehab merit disks condo fairy shaft casio kitty
drain monte fires panic leone onion beats merry scuba verde
dried derby annie derek steal fears tuner alike sagem scout
dealt bucks badge wrist heath lexus realm jenny yemen buses
rouge yeast kenny yukon singh brook wives xerox sorts vsnet
papua armor viral pipes laden aruba merge edgar dubai allan
sperm filme craps frost sally yacht tracy whale shark grows
cliff tract shine wendy diffs ozone pasta serum swift inbox
focal samba wound belle cindy lined boxed cubic spies elect
bunny chevy tions flyer baths emacs climb sparc dover token
kinda dylan belts burke clara flush hayes moses johns jewel
teddy dryer ruled funky joins scary mpegs cakes mixer sbjct
tooth stays drove upset mines logan lance colon lanes purse
align bless crest alloy plots tulsa casey draws bloom loops
surge tahoe souls spank vault wires mails blake orbit niger
bacon paxil spine trout apnic fatty joyce marco isaac oxide
badly scoop sanyo blink carlo tiles tamil fuzzy grams forge
dense brave awful meyer wagon knock peers quilt notre mambo
flour choir blond burst wiley fibre daisy crude bored allah
fares hoped safer marsh ricky theta stake arbor
`.split(/ |\n/g).map( word => word.toUpperCase() ).filter( word => word );

const playerWordInfo = {
    //stores the secret word of player
    word : ''
}

const computerWordInfo = {
    //store the secret word of computer
    word : ''
}

const playerGuessHistory = {
    //stores previous results and no of turns taken to guess of player
    results : [],
    noOfTurnsTaken : 0
}

const computerGuessHistory = {
    //stores previous results and no of turns taken to guess of computer
    results : [],
    noOfTurnsTaken : 0
}

const statusMessages = [
    // status messages to display in different game stages
    'Enter a common 5 letter word for them to guess',
    'Enter a common 5 letter word to guess',
    'Unknown word. Choose a different common 5 letter word for them to guess',
    'Unknown word. Choose a different common 5 letter word to guess'
]

function pickWord() {
    //picks a word from wordlist in random
    const pickedWord = wordlist[ Math.floor( Math.random() * wordlist.length ) ];
    return pickedWord;
}

function getPlayerGuessedWord() {
    //returs the player's guess
    return document.querySelector('#player-guess-input').value.toUpperCase();
}

function setPlayerWordInfo() {
    // sets the player's secret word and handels the input field validatity
    const gameSection = document.querySelector('.game-start');
    const playerWord = gameSection.querySelector('.player-word').value.toUpperCase();

    if( wordlist.includes( playerWord )){
        playerWordInfo.word = playerWord;
        return true;
    }

    displayError( statusMessages[2] );

}

function setComputerWordInfo() {
    //sets the computer's secret word and logs the word to console
    computerWordInfo.word = pickWord();
    console.log( computerWordInfo.word );
}

function getResult( wordInfo, guess ) {
    // forms a result object of the word and guess and returns
    const result = {}
    result.word = guess;
    result.noOfCommonLetters = countCommonLetters( wordInfo.word, result.word );

    return result;
}
function countCommonLetters( word , guess ) {
    // returns number of commonLetters between pickedWord and guessedWord
    let noOfCommonLetters = 0;
    const letterOccurances = {};

    for ( letter of word ) {
       if( !letterOccurances[letter] ){
           letterOccurances[letter] = 1;
           continue;
       }
       letterOccurances[letter] += 1;
    }

    for ( letter of guess ) {
       if( letterOccurances[letter] > 0){
           letterOccurances[letter] -= 1;
           noOfCommonLetters += 1;
       }
    }

    return noOfCommonLetters;
}

function addEventListeners() {
    // adds event listeners to the required fields in documents
    addListenersForPlayerWordInputField();
    addListenersForPlayerGuessInputField();
    addListenersForBeginButton();
    addListenersForPlayerGuessButton();
}

function addListenersForPlayerWordInputField() {
    // adds event listeners to the player's secret word input field
    const gameSection = document.querySelector('.game-start');
    const playerWordInput = gameSection.querySelector('.player-word');

    playerWordInput.addEventListener('input', beginButtonDisabilityToggle);
    playerWordInput.addEventListener('keypress', event => { if( event.keyCode === 13) startGame(); });

}

function addListenersForPlayerGuessInputField() {
    // adds event listeners to the player's guess word input field
    const playerInput = document.querySelector('#player-guess-input');

    playerInput.addEventListener('input', playerGuessButtonDisabilityToggle);
    playerInput.addEventListener('keypress', event => { if( event.keyCode === 13) evaluatePlayerGuess(); });
}

function addListenersForBeginButton() {
    // adds event listeners to the bigin button at start of the game
    document.querySelector('.begin-button').addEventListener('click', startGame);
}

function addListenersForPlayerGuessButton() {
    // adds event listeners to the guess button of the player's guess input panel
    document.querySelector('.player-guess-button').addEventListener('click', evaluatePlayerGuess);
}

function beginButtonDisabilityToggle() {
    // toggles the disability of bigin button and handels the input validity features
    const playerInput = document.querySelector('.player-word').value.toUpperCase();
    if( wordlist.includes( playerInput )){
        document.querySelector('.player-word').classList.add('success');
        document.querySelector('.begin-button').removeAttribute('disabled');
    }else if (playerInput.length === 5) {
        document.querySelector('.player-word').classList.add('error');

        displayError(statusMessages[2]);
    }else {
        document.querySelector('.player-word').classList.remove('error' , 'success');
        changeGameStatusMessage( statusMessages[0] );
    }
}

function playerGuessButtonDisabilityToggle() {
    // toggles the disability of guess button and handels the input validity features
    const valid = checkPlayerGuessValidity();
    if( valid ){
        document.querySelector('#player-guess-input').classList.add('success');
        document.querySelector('.player-guess-button').removeAttribute('disabled');
    }else if (getPlayerGuessedWord().length === 5) {
        document.querySelector('#player-guess-input').classList.add('error');
        displayError(statusMessages[3]);
    }else {
        document.querySelector('#player-guess-input').classList.remove('error' , 'success');
        changeGameStatusMessage( statusMessages[1] );
    }
}

function checkPlayerGuessValidity() {
    // checks the validity of the typed in word by player
    const guessedWord = getPlayerGuessedWord();

    if( wordlist.includes(guessedWord) ){
        return true;
    }
    return false;
}

function startGame() {
    // starts the game by setting the required variables and statusMessages
    const playerWord = setPlayerWordInfo();
    if( !playerWord ) return;

    setComputerWordInfo();

    changeGameStatusMessage( statusMessages[1] );

    document.querySelector('.game-start').classList.add('hide');
    document.querySelector('.main').classList.remove('hide');
}

function changeGameStatusMessage( message , error ) {
    // changes the status message during various stages of the game
    const gameStatus = document.querySelector('.game-status');
    gameStatus.getElementsByTagName('h1')[0].innerHTML = message;
    gameStatus.getElementsByTagName('h1')[0].classList.remove('error');
    if( error ){
        gameStatus.getElementsByTagName('h1')[0].classList.add('error');
    }
}

function evaluatePlayerGuess() {
    // evaluates the player guess and pass the turn to computer
    const valid = checkPlayerGuessValidity();
    if( !valid ){
        displayError( statusMessages[3] );
        return;
    }

    const playerGuess = getPlayerGuessedWord();
    updatePlayerGuesses( playerGuess );
    generatePreviousGuessesList( '.player-guess-list', playerGuessHistory );
    setThePreviousGuessesScrollToBottom( '.player-guess-list' );

    const playerWon = checkIfPlayerWon( playerGuess );
    if( playerWon ){
        displayPlayerWinAndAskToReset();
        return;
    }
    document.querySelector('#player-guess-input').value = '';
    startComputerGuess();
}

function updatePlayerGuesses( playerGuess ) {
    // updates the player guess history with latest result
    result = getResult( computerWordInfo, playerGuess );
    playerGuessHistory.results.push( result );
    playerGuessHistory.noOfTurnsTaken += 1;
}

function generatePreviousGuessesList( selector, guessHistory ) {
    // generates the previous guessed list and respective count of CommonLetters to dispay
    const previousGuessesList = guessHistory.results.map(( guess ) => `<li>${guess.word} | ${guess.noOfCommonLetters} letters in common </li>` ).join('\n');

    document.querySelector(selector).innerHTML = previousGuessesList;

}

function setThePreviousGuessesScrollToBottom( selector ) {
    // sets the scroll bar of the previous guesses to display
    // the last or latest element
    const guessList = document.querySelector( selector );
    guessList.scrollTop = guessList.scrollHeight;
}

function checkIfPlayerWon( guess ) {
    // checks if player is won
    if( guess === computerWordInfo.word ){
        return true;
    }
    return false;
}

function displayPlayerWinAndAskToReset() {
    // displays the player win message and asks for resetting the game
    const setStatus = `Human wins in ${playerGuessHistory.noOfTurnsTaken} turns`;
    const gameStatus = document.querySelector('.game-status');
    gameStatus.getElementsByTagName('h1')[0].innerHTML = setStatus;

    askToReset();
}

function displayError( message ) {
    // displays the error messages at various stages of game
    changeGameStatusMessage( message, true );
}

function startComputerGuess() {
    // computer begins to guess and sets the status for player to guess again
    const computerGuess = pickGuess();

    document.querySelector('.computer-word').value = computerGuess;
    updateComputerGuesses( computerGuess );
    generatePreviousGuessesList( '.computer-guess-list', computerGuessHistory );
    setThePreviousGuessesScrollToBottom( '.computer-guess-list' );

    changeGameStatusMessage( statusMessages[1] );
    const computerWon = checkIfComputerWon( computerGuess );
    if( computerWon ){
        displayComputerWinAndAskToReset();
    }
}

function updateComputerGuesses( computerGuess ) {
    // updates the computer guess history with latest result
    result = getResult( playerWordInfo, computerGuess );
    computerGuessHistory.results.push( result );
    computerGuessHistory.noOfTurnsTaken += 1;
}

function checkIfComputerWon( guess ) {
    // checks if computer is won
    if( playerWordInfo.word === guess){
        return true;
    }
    return false;
}

function displayComputerWinAndAskToReset() {
    // displays that computer is won and ask the player to reset the game
    const setStatus = `Computer wins in ${computerGuessHistory.noOfTurnsTaken} turns`;
    const gameStatus = document.querySelector('.game-status');
    gameStatus.getElementsByTagName('h1')[0].innerHTML = setStatus;

    askToReset();
}

function pickGuess() {
    // computer picks the guess. usually follows the sequential order of the wordlist
    return wordlist[computerGuessHistory.noOfTurnsTaken];
}

function askToReset() {
    // renders the panesl to ask the user for reseting the game
    document.querySelector('.main').classList.add('hide');

    const gameStart = document.querySelector('.game-start');
    gameStart.classList.remove('hide');
    gameStart.querySelector('.player-word').classList.add('hide');

    const beginButton = gameStart.querySelector('.begin-button')
    beginButton.classList.add('reset-button');
    beginButton.innerHTML = 'Reset';
    beginButton.addEventListener('click', reset);
}

function reset() {
    // resets the game by reloading the webpage.
    window.location.reload(true);
}

//calling event listeners so that they are added when webpage loads
addEventListeners();
})();
