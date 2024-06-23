import React from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const LeftAndRightArrows = () => {
    return (
        <div className='flex justify-center items-center gap-1'>
        <span className='text-xl  text-gray-600 border border-gray-700 rounded-md p-2 hover:bg-white hover:cursor-pointer hover:shadow-md'>
            <FaArrowRightLong />
        </span>

        <span className='text-xl  text-gray-600 border border-gray-700 rounded-md p-2 hover:bg-white hover:cursor-pointer hover:shadow-md'>
            <FaArrowLeftLong />
        </span>
    </div>
);
};

export default LeftAndRightArrows;