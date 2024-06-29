import Platform from '@/tools/Platform';
import SearchBox from '@/tools/SearchBox';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { FaLeftRight } from 'react-icons/fa6';

const ProfileSearchBox = () => {
	return (
		<div className='mt-20'>
			<div className='w-full container  bg-primary-01 md:rounded-b-3xl'>
				<div className='text-white w-full   md:flex justify-between items-start pt-4 pb-48 gap-8 text-md'>
					<div className='hidden md:flex justify-center items-center gap-1'>
						<span>پزشکان</span>
						<FaAngleLeft />
						<span>روانشناسی</span>
						<FaAngleLeft />
						<span className=' font-bold'>مشاور خانواده</span>
					</div>
					<div className='w-2/3 xs:py-4 md:py-0 md:w-1/3 mx-auto'>
						<SearchBox />
					</div>
					<div className='hidden md:flex justify-center items-center '>
						<Platform
							color={`text-primary-03`}
							colorHover={`text-white`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSearchBox;
