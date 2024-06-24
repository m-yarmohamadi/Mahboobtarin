import React from 'react';
import RightMenu from './RightMenu';
import DetailProfile from './DetailProfile';

const MainProfile = () => {
	return (
		<div className='container box-content'>
			<div className='   h-full w-full rounded-ss-3xl ps-6 -mt-48'>
				<div className=' w-full  bg-white rounded-ss-3xl  h-full'>
					<div className='grid grid-cols-12 w-full'>
						<div className=' col-span-2  w-full h-full'>
							<RightMenu />
						</div>
						<div className=' col-span-7 bg-white w-full h-full'>
							<DetailProfile />
						</div>
						<div className=' col-span-3  w-full h-full'>111</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainProfile;
