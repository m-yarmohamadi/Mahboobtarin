import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Platform = ({color,colorHover, data}) => {
	return (
		<div className=' flex justify-start items-center text-3xl gap-4 py-4 text-gray-500'>
			<span className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaWhatsapp />
			</span>
			<Link href={data?.telegram || ""} className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaTelegram />
			</Link>
			<Link href={data?.instagram || ""} target='_blank' className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaInstagram />
			</Link>
			<Link href={data?.twitter || ""} className={`${color} hover:${colorHover} hover:cursor-pointer`}>
				<FaTwitter />
			</Link>
		</div>
	);
};

export default Platform;
