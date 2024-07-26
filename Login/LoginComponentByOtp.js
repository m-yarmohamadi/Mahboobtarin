import CheckOtp from '@/tools/CheckOtp';
import SendMobile from '@/tools/SendMobile';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import 'react-international-phone/style.css';
import { login } from '@/services/authService';
import { useRouter } from 'next/router';
import { toastFunction } from '@/utils/toast';
import Cookies from 'js-cookie';
const resend_time = 20;

const LoginComponentByOtp = () => {
	const [phone, setPhone] = useState();
	const [step, setStep] = useState(1);
	const [time, setTime] = useState(resend_time);
	const [otp, setOtp] = useState();
	const router = useRouter();
	const { isPending, error, data, mutateAsync } = useMutation({
		mutationFn: login,
	});

	const handleSubmitMobile = async (e) => {
		e.preventDefault();
		try {
			const data = await mutateAsync({ username: phone, otp: 0, type: 'otp' });
			if (data.data.status === 200) {
				toastFunction(data.data.message, 'success');
				setStep(2);
			} else {
				toastFunction('خطای ناشناخته', 'error');
			}
		} catch (err) {
			toastFunction(err?.response?.data?.message, 'error');
		}
	};
	const handleSubmitOtp = async (e) => {
		e.preventDefault();
		try {
			const data = await mutateAsync({ username: phone, otp: otp, type: 'otp' });
			if (data.data.status === 200) {
				toastFunction(data.data.message, 'success');
				Cookies.set("accessToken", data.data.access_token, {expires:1/48});
				router.push('/profile');
			} else {
				toastFunction('خطای ناشناخته', 'error');
			}
		} catch (err) {
			toastFunction(err?.response?.data?.message, 'error');
		}
	};
	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<SendMobile
						setPhone={setPhone}
						handleSubmitMobile={handleSubmitMobile}
						loading={isPending}
					/>
				);
			case 2:
				return (
					<CheckOtp
						handleSubmitOtp={handleSubmitOtp}
						setOtp={setOtp}
						otp={otp}
						loading={isPending}
						setStep={setStep}
						time={time}
						onResendOtp={handleSubmitMobile}
					/>
				);

			default:
				null;
				break;
		}
	};
	useEffect(() => {
		const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [time]);

	return <div className='transition-all duration-1000 ease-in-out'>{renderStep()}</div>;
};

export default LoginComponentByOtp;
 