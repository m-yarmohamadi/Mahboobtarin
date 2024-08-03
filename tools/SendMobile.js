import { enToFaNumber } from '@/utils/enToFa';
import React from 'react';
import { PhoneInput } from 'react-international-phone';
import Loading from './Loading';

const SendMobile = ({ phone, setPhone, handleSubmitMobile, loading }) => {
	return (
		<div className='w-full mx-auto'>
			<form
				onSubmit={handleSubmitMobile}
				className='rtl:mr-3  w-full p-20 flex flex-col justify-center items-center gap-4 transition-all duration-1000 ease-in-out'>
				<p className=' w-full flex justify-center items-center pb-2 font-bold '>لطفا جهت ورود به وبسایت شماره تلفن همراه خود را وارد کنید.</p>

				<PhoneInput
					defaultCountry='ir'
					value={phone}
					onChange={(phone) => setPhone(phone)}
					inputStyle={{
						fontSize: '22px',
						fontWeight: 900,
						lineHeight: 1.8,
						width: '100%',
						height: '3rem',
						borderStartEndRadius: '0.5rem',
						borderEndEndRadius: '0.5rem',
					}}
					style={{ width: '100%', height: '4rem', direction: 'ltr' }}
				/>
				<button
					type='submit'
					className='w-full bg-primary-01 text-white p-3 rounded-md font-bold flex justify-center items-center'>
					{loading ? <Loading /> : 'مرحله بعد'}
				</button>
			</form>
		</div>
	);
};

export default SendMobile;
