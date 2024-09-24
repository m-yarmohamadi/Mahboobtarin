import { useState } from 'react';
import UserStep02 from './UserStep02';
import UserStep01 from './UserStep01';

const UserStep = ({ mobile, otp }) => {
	const [stepUser, setStepUser] = useState(0);
	const [nationalCode, setNationalCode] = useState();

	return <div className='w-full h-full transition-all duration-1000 ease-in-out'>
		{stepUser === 0 ? 
			<UserStep01 
				setStepUser={setStepUser} 
				setNationalCode={setNationalCode} 
				mobile={mobile}
				otp={otp}
			/> 
			: 
			<UserStep02 
				setStepUser={setStepUser} 
				nationalCode={nationalCode} 
				mobile={mobile}
				otp={otp}
			/>}
		</div>;
};
export default UserStep;
