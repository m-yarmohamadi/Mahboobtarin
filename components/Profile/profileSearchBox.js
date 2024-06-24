import Platform from '@/tools/Platform';
import SearchBox from '@/tools/SearchBox';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { FaLeftRight } from 'react-icons/fa6';

const ProfileSearchBox = () => {
	return (
		<div>
			<div className='w-full container  bg-primary-01 md:rounded-b-3xl'>
				<div className='text-white w-full   flex justify-between items-start pt-4 pb-48 gap-8 text-md'>
					<div className='flex justify-center items-center gap-1'>
						<span>پزشکان</span>
						<FaAngleLeft />
						<span>روانشناسی</span>
						<FaAngleLeft />
						<span className=' font-bold'>مشاور خانواده</span>
					</div>
					<div className='w-1/3 mx-auto'>
						<SearchBox />
					</div>
					<Platform />
				</div>
			</div>
		</div>
	);
};

export default ProfileSearchBox;
