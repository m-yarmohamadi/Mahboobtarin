import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { toastFunction } from '@/utils/toast';
import { useState } from 'react';
import Loading from '@/tools/Loading';
import CheckOtp from '@/tools/CheckOtp';
import OTPInput from 'react-otp-input';
import { enToFaNumber } from '@/utils/enToFa';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import UserStep02 from './UserStep02';
import UserStep01 from './UserStep01';

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

const UserStep = ({  }) => {
	const [error2, setError2] = useState([]);
	const [loading, setLoading] = useState(0);
	const [otp, setOtp] = useState();
	const [activeOtp, setActiveOtp] = useState(false);
	const [nationalCode, setNationalCode] = useState()


	const initialValues = {
		name: '',
		lastname: '',
		gender: '',
		nationality: '',
		national_code: '',
		passport_number: '',
		birthday: '',
		mobile: '+98',
		email: '',
		password: '',
		confirmPassword: '',
	};
	const onSubmit = async (values) => {
		setError2([]);
		setLoading(1);
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				step: '1',
				type: 'user',
			});
			if (response.data.status === 200) {
				setActiveOtp(true);
			} else {
				console.log('خطای ناشناخته');
			}
			console.log(response.data);
			setNationalCode(values.national_code);
			setLoading(0);
		} catch (error) {
			console.log(error);
			setLoading(0);
			setError2(error.response.data.message);

			toastFunction(error2, 'error');
		}
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
		nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
		national_code: Yup.string().when('nationality', {
			is: (value) => value === 'ایرانی',
			then: (schema) => schema.required('وارد کردن کدملی اجباری است').matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
			otherwise: (schema) => schema,
		}),
		passport_number: Yup.string().when('nationality', {
			is: (value) => value === 'اتباع خارجی',
			then: (schema) => schema.required('وارد کردن شماره پاسپورت اجباری است').matches(/^[0-9]{8}$/, 'لطفاً شماره پاسپورت معتبر 8 رقمی وارد کنید'),
			otherwise: (schema) => schema,
		}),

		birthday: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
		mobile: Yup.string()
			.required('وارد کردن شماره تلفن همراه اجباری است')
			.matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
		email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
		password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(6, 'حداقل 6 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		confirmPassword: Yup.string()
			.required('وارد کردن تکرار کلمه عبور اجباری است')
			.oneOf([Yup.ref('password'), null], 'کلمه عبور و تکرار آن باید یکسان باشند '),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});
	const handleSubmitOtp = async (e) => {
		e.preventDefault();
		try {
			const data = await mutateAsync({ verifycode: otp, step: '5', type: 'user' });
			if (data.data.status === 200) {
				toastFunction(data.data.message, 'success');
				Cookies.set('accessToken', data.data.access_token, { expires: 1 / 48 });
				saveUserDataHandler(data.data.user);
				window.location.href = '/';
			} else {
				toastFunction('خطای ناشناخته', 'error');
			}
		} catch (err) {
			toastFunction(err?.response?.data?.message, 'error');
		}
	};

	return <div className='w-full h-full transition-all duration-1000 ease-in-out'>{!activeOtp ? <UserStep01 setActiveOtp={setActiveOtp} setNationalCode={setNationalCode} /> : <UserStep02 setActiveOtp={setActiveOtp} nationalCode={nationalCode} />}</div>;
};
export default UserStep;


// {error2 &&
// 	error2.map((item, index) => {
// 		return <div key={index}>{item}</div>;
// 	})}
