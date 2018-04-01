import React from 'react';

const GGLabel = ( {secretWord} ) => {
    // renders the secret word of player
    return (
        <div className='secret-word'>
            <p>Secret word: {secretWord ? secretWord : ''}</p>
        </div>
    );
};

export default GGLabel;
