import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Platform = ({color,colorHover, data}) => {
	return (
		<div className=' flex justify-start items-center text-3xl gap-4 text-gray-500'>
			<span className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaWhatsapp className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'/>
			</span>
			<Link href={data?.telegram || ""} className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaTelegram className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'/>
			</Link>
			<Link href={data?.instagram || ""} target='_blank' className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaInstagram className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'/>
			</Link>
			<Link href={data?.twitter || ""} className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaTwitter className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'/>
			</Link>
		</div>
	);
};

export default Platform;
