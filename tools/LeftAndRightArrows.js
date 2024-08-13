import React from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const LeftAndRightArrows = () => {
    return (
        <div className='flex justify-center items-center gap-1'>
        <button id='booth-expert-btn-prev' className='text-xl disabled:opacity-50 text-gray-600 border border-gray-700 rounded-md p-2 hover:bg-white hover:cursor-pointer hover:shadow-md'>
            <FaArrowRightLong />
        </button>

        <button id='booth-expert-btn-next' className='text-xl disabled:opacity-50 text-gray-600 border border-gray-700 rounded-md p-2 hover:bg-white hover:cursor-pointer hover:shadow-md'>
            <FaArrowLeftLong />
        </button>
    </div>
);
};

export default LeftAndRightArrows;