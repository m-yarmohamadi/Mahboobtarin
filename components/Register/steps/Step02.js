import Input from '@/tools/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { useState } from 'react';
import { Countries } from '@/data/countries';
import Select from '@/tools/Select';



const Step02 = ({nextStep,prevStep,nationalCode}) => {
	const [error, setError] = useState([]);
	const [loading, setLoading] = useState(0);


	const initialValues = {
		country: 'ایران',
		province_id: '',
		city_id: '',
		// postalcode: '',
		address: '',
		address_work: '',
	};
	const onSubmit = async (values) => {
		setLoading(1)
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				national_code:nationalCode,
				step: '2',
				type:'expert'

			});
			console.log(response.data);
			setLoading(0)

			nextStep();
		} catch (error) {
			console.log(error);
			setLoading(0)

			setError(error.response.data.message);
		}
	};
	const validationSchema = Yup.object({
		country: Yup.string().required('وارد کردن کشور محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(20, 'حداکثر 20 حرف وارد کنید'),
		province_id: Yup.string().required('وارد کردن استان محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(20, 'حداکثر 20 حرف وارد کنید'),
		city_id: Yup.string().required('وارد کردن شهر محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(20, 'حداکثر 20 حرف وارد کنید'),
		// postalcode: Yup.string()
		// 	.required('وارد کردن کدپستی اجباری است')
		// 	.matches(/^[0-9]{10}$/, 'لطفاً کدپستی معتبر 10 رقمی وارد کنید'),
		address: Yup.string().required('وارد کردن آدرس محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(200, 'حداکثر 200 حرف وارد کنید'),
		address_work: Yup.string().required('وارد کردن آدرس محل کار اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(200, 'حداکثر 200 حرف وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<div className='w-full h-full'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start '>
				<Select
							name={'country'}
							label={'ملیت'}
							options={Countries}
							formik={formik}
						/>
					<Input
						name={'province_id'}
						label={'استان محل سکونت'} 
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'city_id'}
						label={'شهر محل سکونت'}
						formik={formik}
						type={'text'}
					/>
					{/* <Input
						name={'postalcode'}
						label={'کدپستی'}
						formik={formik}
						type={'text'}
					/> */}
					</div>
					<div className='grid grid-cols-1  gap-4 w-full items-start '>

					<Input
						name={'address'}
						label={'آدرس محل سکونت'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'address_work'}
						label={'آدرس محل کار'}
						formik={formik}
						type={'text'}
					/>
				</div>
				<NextPrev prevStep={prevStep} loading={loading} step={2}/>

			</form>
			{error &&
				error.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}

		</div>
	);
};

export default Step02;
