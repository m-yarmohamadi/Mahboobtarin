import Platform from '@/tools/Platform';
import SearchBox from '@/tools/SearchBox';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { FaLeftRight } from 'react-icons/fa6';

const ProfileSearchBox = () => {
	return (
		<div className=''>
			<div className='w-full container  bg-primary-01 md:rounded-b-3xl'>
				<div className='text-white w-full flex flex-col justify-between items-start pb-48 gap-6'>
					<div className='w-full flex flex-col xs:flex-row pt-4 gap-4 items-center justify-between'>
						<div className='flex justify-center items-center gap-1 text-xs md:text-sm'>
							<span>پزشکان</span>
							<FaAngleLeft />
							<span>روانشناسی</span>
							<FaAngleLeft />
							<span className=' font-bold'>مشاور خانواده</span>
						</div>
						<div className='flex justify-center items-center '>
							<Platform
								color={`text-primary-03`}
								colorHover={`text-white`}
							/>
						</div>
					</div>
					<div className='xs:w-2/3 lg:w-1/3 mx-auto'>
						<SearchBox />
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default ProfileSearchBox;
