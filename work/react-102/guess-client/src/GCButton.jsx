import React from 'react';

//creating a button component
const GCButton = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};

export default GCButton;
