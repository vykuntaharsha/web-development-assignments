import React from 'react';

const GCList = ({ results }) => {

    const previousGuessesList = results.map( (result, index) =>
        // creating a list of previous guesses
         <li key={index}> {result.playerGuess.toUpperCase()} has {result.noOfCommonLetters} letters in common </li>
    );

    return (
        <section className="previous-guesses">
            <ul>
                {previousGuessesList.reverse()}
            </ul>
        </section>
    );
};

export default GCList;
