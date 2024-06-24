import React from 'react';

const TitleItems = ({title}) => {
    return (
        <div className=' border-s-2 border-primary-01 px-2 py-1 mb-4 text-md text-primary-01 font-bold mt-16 ms-4'>
            {title}
        </div>
    );
};

export default TitleItems;