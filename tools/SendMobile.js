import { enToFaNumber } from '@/utils/enToFa';
import React from 'react';
import { PhoneInput } from 'react-international-phone';
import Loading from './Loading';

const SendMobile = ({ phone,  setPhone, handleSubmitMobile,loading }) => {
	const buttonStyle = {
		color: 'white',
		backgroundColor: 'green',
		// Add any other CSS properties you want to customize the button
	};
	return (
		<div className='w-1/5 mx-auto'>
			<form
				onSubmit={handleSubmitMobile}
				className='rtl:mr-3  w-full p-20 flex flex-col justify-center items-center gap-2 transition-all duration-1000 ease-in-out'>
				<p className=' w-full flex justify-center items-center pb-2 font-bold '>لطفا جهت ورود به وبسایت  شماره تلفن همراه خود را وارد کنید.</p>

				<PhoneInput
					defaultCountry='ir'
					value={phone}
					onChange={(phone) => setPhone(phone)}
					inputStyle={{
						fontSize: '26px',
						width: '100%',
						height: '3rem',
						borderRadius:'0.5rem'
					}}
					style={{ width: '80%', height: '4rem', direction: 'ltr' }}
					buttonStyle={buttonStyle}
				/>
				<button
					type='submit'
					className='w-4/5 bg-primary-01 text-white py-3 rounded-md font-bold flex justify-center items-center'>
						{loading ? <Loading /> :  'مرحله بعد'}
					
				</button>
			</form>
		</div>
	);
};

export default SendMobile;
