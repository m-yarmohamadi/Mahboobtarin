import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import Loading from './Loading';

const CheckOtp = ({ otp, setOtp, handleSubmitOtp,loading }) => {
	return (
        <div className='w-1/6 mx-auto'>

		<form
			onSubmit={handleSubmitOtp}
			className='w-full p-20 flex flex-col justify-center items-center gap-2 transition-all duration-1000 ease-in-out'>
			<p className=' w-full flex justify-center items-center py-2 font-bold text-primary-01 text-center text-sm'>لطفا کد ارسال شده به تلفن همراه خود را در اینجا درج کنید

</p>
			<OTPInput
				value={otp}
				onChange={setOtp}
				numInputs={5}
				renderSeparator={<span>-</span>}
				containerStyle={`flex items-center  gap-x-5 justify-center`}
				renderInput={(props) => (
					<input
						type='number'
						{...props}
					/>
				)}
				inputStyle={{
					width: '2.5rem',
					padding: '0.5rem 0.2rem',
					border: '1px solid #15aa7f',
					borderRadius: '0.5rem',
				}}
			/>
			
			<button
					type='submit'
					className='w-4/5 bg-primary-01 text-white py-3 rounded-md font-bold flex justify-center items-center'>
						{loading ? <Loading /> :  'ورود'}
					
				</button>
		</form>
        </div>
	);
};

export default CheckOtp;
