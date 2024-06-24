import React from 'react';
import { FaAngleDown } from 'react-icons/fa';

const ViewMore = () => {
    return (
        <span className='flex justify-center items-center w-full font-bold text-lg text-primary-01 gap-2 pt-2'>
        <span>
            <FaAngleDown />
        </span>
        <span>مشاهده بیشتر</span>
    </span>
);
};

export default ViewMore;