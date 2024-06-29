import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Platform = ({color,colorHover}) => {
	return (
		<div className=' flex justify-start items-center text-3xl gap-4 py-4 text-gray-500'>
			<span className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaWhatsapp />
			</span>
			<span className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaTelegram />
			</span>
			<span className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaInstagram />
			</span>
			<span className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaTwitter />
			</span>
		</div>
	);
};

export default Platform;
