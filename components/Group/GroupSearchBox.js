import Platform from '@/tools/Platform';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { FaLeftRight } from 'react-icons/fa6';
import SearchBox from '../search&filter/SearchBox';

const GroupSearchBox = () => {
	return (
		<div className=''>
			<div className='w-full container  bg-primary-01 md:rounded-b-3xl'>
				<div className='text-white w-full   md:flex justify-between items-start pt-4 pb-48 gap-8 text-md'>
					<div className='w-2/3 xs:py-4 md:py-0 md:w-1/3 mx-auto'>
						<SearchBox />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupSearchBox;
