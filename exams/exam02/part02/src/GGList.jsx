import React from 'react';

const GGList = ( {results} ) => {

    //renders the list of results
    if(!results){
        return (
            <ul className='previous-guesses'>
            </ul>
        );
    }
    const list = results.map( (result, index) => {
        return (
            <li key={index}>
                {result.guess} matches {result.matched} letters
            </li>
        );
    });

    return (
        <ul className='previous-guesses'>
            {list}
        </ul>
    );
};

export default GGList;
