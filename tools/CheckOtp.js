import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import Loading from './Loading';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { enToFaNumber } from '@/utils/enToFa';

const CheckOtp = ({ otp, setOtp, handleSubmitOtp, loading, setStep, time, onResendOtp }) => {
	return (
		<div className=''>
			<form
				onSubmit={handleSubmitOtp}
				className='w-full p-20 flex flex-col justify-center items-center gap-2 transition-all duration-1000 ease-in-out'>
				<p className=' w-full flex justify-center items-center py-2 font-bold text-primary-01 text-center text-sm'>لطفا کد ارسال شده به تلفن همراه خود را در اینجا درج کنید</p>
				<OTPInput
					value={otp}
					onChange={setOtp}
					numInputs={5}
					renderSeparator={<span>-</span>}
					containerStyle={{
						display: 'flex',
						fontWeight: 900,
						color: '#0693a4',
						flexDirection: 'row-reverse',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '8px',
					}}
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
					className='w-full bg-primary-01 text-white py-2  rounded-md font-bold flex justify-center items-center'>
					{loading ? <Loading /> : 'ورود'}
				</button>
				<div>
					{time > 0 ? (
						<p>
							<span className='font-bold text-error'>{enToFaNumber(time)}</span> ثانیه تا ارسال کد جدید
						</p>
					) : (
						<button
							onClick={onResendOtp}
							className='p-2 bg-primary-01 text-white rounded-md hover:bg-opacity-90'
							type=''>
							ارسال مجدد کد تأیید
						</button>
					)}
				</div>
				<button
					onClick={() => setStep(1)}
					type='button'>
					<HiArrowRightOnRectangle className='w-8 h-8 text-primary-01 hover:text-opacity-80' />
				</button>
			</form>
		</div>
	);
};

export default CheckOtp;
