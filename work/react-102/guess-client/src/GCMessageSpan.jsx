import React from 'react';

//creating a section to display any messages passed through
const GCMessageSpan = ({status}) => {
    return (
        <section>
            <h3> {status} </h3>
        </section>
    );
};

export default GCMessageSpan;
