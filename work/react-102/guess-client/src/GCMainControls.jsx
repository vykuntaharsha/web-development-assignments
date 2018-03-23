import React from 'react';
import GCButton from './GCButton';


const GCMainControls = ({ playerGuess, onClick, buttonLabel, setPlayerGuess }) => {

    const checkForSubmit = (event) => {
        if(event.key === "Enter"){
            //when the enter is pressed the user's guess evaluates
            onClick();
        }
    };

    const updatePlayerGuess = (event) => {
        //updating the user's guess with value from input
        setPlayerGuess(event.target.value);
    };

    return(
        <main className="main-controls">
            <input
                onKeyPress = {checkForSubmit}
                onChange = {updatePlayerGuess}
                placeholder = "Enter your guess"
                value = {playerGuess}
                disabled = {buttonLabel==='Reset'}
            />
            <GCButton text={buttonLabel} onClick={onClick} />
        </main>
    );
};

export default GCMainControls;
