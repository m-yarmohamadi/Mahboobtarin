import React from 'react';
import { BiSearch, BiSlider } from 'react-icons/bi';

const SearchBox = () => {
	return (
		<div className='w-full flex justify-center items-center bg-white rounded-full'>
			<div className='w-full px-3  rounded-s-full flex justify-center items-center '>
				<input
					className=' text-gray-300 h-8 w-full border-none focus:border-none ring-0 focus:ring-0'
					type='text'
					name=''
					defaultValue='جستجو...'
				/>
			</div>
			<div className='w-full rounded-e-full flex justify-end items-center gap-2  p-1 text-gray-400'>
				<div className='flex justify-center items-center text-xl font-bold gap-1'>
					<span className=' rotate-90'>
						<BiSlider />
					</span>
					<span>فیلترها</span>
				</div>
				<div className=' hover:bg-opacity-80 bg-primary-01 rounded-full p-2 text-white font-bold text-2xl '>
					<BiSearch />
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
