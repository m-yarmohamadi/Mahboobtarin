import { useState } from 'react';
import Header from '../Header';
import OtpForm from './OtpForm';
import PasswordForm from './PasswordForm';
import useAllSettings from '@/hooks/useAllSettings';
import Link from 'next/link';

export default function LoginForm({ otp, setOtp, mobile, onResendOtp, setStep, setNationalCodeInitial, setRegisterStep, setUserData, isRegister }) {
	const [loginWithOtp, setLoginWithOtp] = useState(true);
	const data = useAllSettings();

	return (
		<div className='w-full flex flex-col pt-12'>
			<div className='flex items-center justify-center'>
				<div className='w-full h-auto p-7 bg-white rounded-lg shadow-s max-w-lg gap-7 mx-auto flex items-center justify-center flex-col'>
					<div className='w-full'>
						<Link href="/">
							<img
								src={data?.logo}
								alt=''
								className='max-w-[170px] mx-auto'
							/>
						</Link>
					</div>

					{loginWithOtp ? (
						<OtpForm
							mobile={mobile}
							onLoginPassword={() => setLoginWithOtp(false)}
							onResendOtp={onResendOtp}
							setStep={setStep}
							setNationalCodeInitial={setNationalCodeInitial}
							setRegisterStep={setRegisterStep}
							setUserData={setUserData}
							isRegister={isRegister}
							otp={otp}
							setOtp={setOtp}
						/>
					) : (
						<PasswordForm
							setNationalCodeInitial={setNationalCodeInitial}
							setRegisterStep={setRegisterStep}
							setUserData={setUserData}
							setStep={setStep}
							mobile={mobile}
							onLoginOtp={(e) => {
								onResendOtp(e);
								setLoginWithOtp(true);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
