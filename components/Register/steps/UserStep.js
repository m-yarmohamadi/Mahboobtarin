import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toastFunction } from '@/utils/Toast';
import { useState } from 'react';
import UserStep02 from './UserStep02';
import UserStep01 from './UserStep01';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';

const time = 90;
const Nationality = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 2, label: 'ایرانی', value: 'iran' },
	{ id: 3, label: 'اتباع خارجی', value: 'noiran' },
];
const gender = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 2, label: 'زن', value: 'woman' },
	{ id: 3, label: 'مرد', value: 'man' },
];

const UserStep = ({ mobile }) => {
	const [activeOtp, setActiveOtp] = useState(false);
	const [nationalCode, setNationalCode] = useState();

	return <div className='w-full h-full transition-all duration-1000 ease-in-out'>
		{!activeOtp ? 
			<UserStep01 
				setActiveOtp={setActiveOtp} 
				setNationalCode={setNationalCode} 
				mobile={mobile}
			/> 
			: 
			<UserStep02 
				setActiveOtp={setActiveOtp} 
				nationalCode={nationalCode} 
				mobile={mobile}
			/>}
		</div>;
};
export default UserStep;


// {error2 &&
// 	error2.map((item, index) => {
// 		return <div key={index}>{item}</div>;
// 	})}
