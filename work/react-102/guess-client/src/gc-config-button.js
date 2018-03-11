// sets the button mode accoriding to the state of game
export const setButtonMode = (gameStatus, onPlaying, onReset) => {
    if(!gameStatus){
        this.label = 'Guess';
        this.onClick = onPlaying;
    }else {
        this.label = 'Reset';
        this.onClick = onReset;
    }
    return this;
};
