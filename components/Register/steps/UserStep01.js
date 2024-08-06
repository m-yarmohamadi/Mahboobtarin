import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import Loading from '@/tools/Loading';
import { Countries } from '@/data/countries';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';
import toast from 'react-hot-toast';
import { enToFaMessages } from '@/utils/enToFaMessages';

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

const daysArray = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString();
    return { id: day, label: day, value: day };
});

const monthsArray = [
    { id: '1', label: 'January', value: '01' },
    { id: '2', label: 'February', value: '02' },
    { id: '3', label: 'March', value: '03' },
    { id: '4', label: 'April', value: '04' },
    { id: '5', label: 'May', value: '05' },
    { id: '6', label: 'June', value: '06' },
    { id: '7', label: 'July', value: '07' },
    { id: '8', label: 'August', value: '08' },
    { id: '9', label: 'September', value: '09' },
    { id: '10', label: 'October', value: '10' },
    { id: '11', label: 'November', value: '11' },
    { id: '12', label: 'December', value: '12' }
];

const currentYearMiladi = new Date().getFullYear();
const startYearMiladi = 1921;
const yearsArray = Array.from({ length: currentYearMiladi - startYearMiladi + 1 }, (_, i) => {
    const year = (startYearMiladi + i).toString();
    return { id: year, label: year, value: year };
});

const initialValues = {
	name: '',
	lastname: '',
	gender: '',
	nationality: 'Iran',
	national_code: '',
	passport_number: '',
	birthday: '',
	email: '',
	password: '',
	confirmPassword: '',
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
	email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
	password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(6, 'حداقل 6 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	confirmPassword: Yup.string()
		.required('وارد کردن تکرار کلمه عبور اجباری است')
		.oneOf([Yup.ref('password'), null], 'کلمه عبور و تکرار آن باید یکسان باشند '),
});


const UserStep01 = ({ setActiveOtp, setNationalCode, mobile }) => {
	const [selectedDay, setSelectedDay] = useState(daysArray[0].value);
	const [selectedMonth, setSelectedMonth] = useState(monthsArray[0].value);
    const [selectedYear, setSelectedYear] = useState(yearsArray[0].value);
	const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));
	const { mutate:mutateRegister, isPending } = useMutation({mutationFn:register});

	const onSubmit = (values) => {
		mutateRegister({
			...values,
			mobile,
			check_user_register:false,
			step:"1",
			verifycode:0,
			type:"user"
		},{
			onSuccess:({data})=>{
				if(data && data.status === 200){
					setActiveOtp(true);
					setNationalCode(values.national_code);
				}
			},
			onError:(error)=>{
				toast.error(enToFaMessages(error?.response?.data?.message[0]));
			}
		});
		
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<div>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start '>
					<Input
						name={'name'}
						label={'نام'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'lastname'}
						label={'نام خانوادگی'}
						formik={formik}
						type={'text'}
					/>

					<div className='flex justify-between items-start gap-4'>
						<Select
							name={'gender'}
							label={'جنسیت'}
							options={gender}
							formik={formik}
						/>
						<Select
							name={'nationality'}
							label={'کشور محل اقامت'}
							options={sortedCountries}
							formik={formik}
						/>
					</div>

					<div className='flex justify-between items-start gap-4'>
						{formik.values.nationality === 'Iran' && (
							<Input
								name={'national_code'}
								label={'کد ملی'}
								formik={formik}
								type={'text'}
							/>
						)}
						{formik.values.nationality !== 'Iran' && (
							<Input
								name={'passport_number'}
								label={'شماره پاسپورت'}
								formik={formik}
								type={'text'}
							/>
						)}
						<Input
							name={'email'}
							label={'ایمیل'}
							formik={formik}
							type={'text'}
						/>
					</div>
					<div className='flex justify-between items-start gap-4'>
						{/* <Input
							name={'mobile'}
							label={'شماره تلفن همراه'}
							formik={formik}
							type={'text'}
							placeholder={'+98'}
							dir='ltr'
						/> */}

						<div className='w-full flex items-end gap-2'>
							<Select
								label="تاریخ تولد"
								name={"day"}
								options={daysArray}
								onChange={(e)=>{
									setSelectedDay(e.target.value);
									formik.setFieldValue("birthday", `${selectedYear}-${selectedMonth}-${e.target.value}`)
								}}
								value={selectedDay}
							/>
							<Select
								name={"month"}
								options={monthsArray}
								onChange={(e)=>{
									setSelectedMonth(e.target.value);
									formik.setFieldValue("birthday", `${selectedYear}-${e.target.value}-${selectedDay}`)
								}}
								value={selectedMonth}
							/>
							<Select
								name={"year"}
								options={yearsArray}
								onChange={(e)=>{
									setSelectedYear(e.target.value);
									formik.setFieldValue("birthday", `${e.target.value}-${selectedMonth}-${selectedDay}`)
								}}
								value={selectedYear}
							/>
						</div>
					</div>
					<div className='flex justify-between items-start gap-4'>
						<Input
							name={'password'}
							label={'کلمه عبور'}
							type={'password'}
							formik={formik}
						/>
						<Input
							name={'confirmPassword'}
							label={'تکرار کلمه عبور'}
							type={'password'}
							formik={formik}
						/>
					</div>
				</div>
				<button
					className='mt-7'
					type='submit'>
					{isPending ? (
						<span className='btn btn--primary'>
							<Loading />{' '}
						</span>
					) : (
						<span className='btn btn--primary'>ثبت و دریافت کد تأیید</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default UserStep01;
