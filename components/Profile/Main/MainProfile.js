import React from 'react';
import RightMenu from './RightMenu';
import DetailProfile from './DetailProfile';
import LeftProfile from './LeftProfile';

const MainProfile = () => {
	return (
		<div className='container pe-0 content-box'>
			<div className='   h-full w-full rounded-ss-3xl  -mt-48'>
				<div className=' pb-16 w-full  bg-white rounded-ss-3xl  h-full'>
					<div className=' grid md:grid-cols-12 gap-8 w-full'>
						<div className=' md:col-span-2  w-full h-full'>
							<RightMenu />
						</div>
						<div className=' md:col-span-6 bg-white w-full h-full'>
							<DetailProfile />
						</div>
						<div className=' md:col-span-4  w-full h-full'>
							<LeftProfile />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainProfile;
