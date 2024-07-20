import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState } from 'react';
import 'react-international-phone/style.css';
import axios from 'axios';
import CheckOtp from '@/tools/CheckOtp';
import SendMobile from '@/tools/SendMobile';
import { useRouter } from 'next/router';
import { enToFaNumber } from '@/utils/enToFa';
import { toastFunction } from '@/utils/toast';
import Cookies from 'js-cookie';

const login = () => {
	const router = useRouter();

	const [phone, setPhone] = useState();
	const [status, setStatus] = useState();
	const [accessToken, setAccessToken] = useState('');
	const [otp, setOtp] = useState();
	const [error, setError] = useState([]);
	const [loading, setLoading] = useState(false);

	const faPhone = enToFaNumber(phone);

	const handleSubmitMobile = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post('https://mahboobtarin.mostafaomrani.ir/api/v1/login', { username: phone, otp: 0 });
			setLoading(false);
			setStatus(res.data.status);
			console.log(res.data);
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
			console.log(err.response.data.message);
			toastFunction(error, 'error');

			console.log(err);
		}
	};
	const handleSubmitOtp = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post('https://mahboobtarin.mostafaomrani.ir/api/v1/login', { username: phone, otp: otp });

			setLoading(false);
console.log(res);
			if (res.data.status === 200) {
				Cookies.set('accessToken',res.data.access_token,{ expires: 1 })
				router.push('/'); 
			}
			setStatus(100);
			console.log('token');
			console.log(token);
		} catch (err) {
			setLoading(false);

			console.log(err);
		}
	};

	return (
		<div className='mt-20 transition-all duration-1000 ease-in-out'>
			<Header />
			<div className='px-10 pt-20 container flex flex-col justify-between items-center w-full h-96 bg-primary-01 bg-opacity-10'>
				{!status && (
					<SendMobile
						phone={phone}
						faPhone={faPhone}
						setPhone={setPhone}
						handleSubmitMobile={handleSubmitMobile}
						loading={loading}
					/>
				)}
				{status === 200 && (
					<CheckOtp
						otp={otp}
						setOtp={setOtp}
						handleSubmitOtp={handleSubmitOtp}
						loading={loading}
					/>
				)}
				<div className='p-8'>
					<span className=' hover:text-primary-01 font-bold hover:cursor-pointer'>ورود با ایمیل و کلمه عبور</span>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default login;
