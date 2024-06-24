import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Platform = () => {
    return (
        <div className='flex justify-start items-center text-3xl gap-4 py-4 text-gray-500'>
        <span className=' hover:text-primary-01 hover:cursor-pointer'>
            <FaWhatsapp />
        </span>
        <span className=' hover:text-primary-01 hover:cursor-pointer'>
            <FaTelegram />
        </span>
        <span className=' hover:text-primary-01 hover:cursor-pointer'>
            <FaInstagram />
        </span>
        <span className=' hover:text-primary-01 hover:cursor-pointer'>
            <FaTwitter />
        </span>
    </div>
);
};

export default Platform;