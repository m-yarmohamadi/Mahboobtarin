import Input from '@/tools/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';

const Step02 = ({nextStep,prevStep}) => {
	const initialValues = {
		country: '',
		state: '',
		city: '',
		posrcode: '',
		homeAddress: '',
		officeAddress: '',
	};
	const onSubmit = (values) => {
		console.log(values);
		nextStep()

	};
	const validationSchema = Yup.object({
		country: Yup.string().required('وارد کردن کشور محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		state: Yup.string().required('وارد کردن استان محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		city: Yup.string().required('وارد کردن شهر محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		posrcode: Yup.string()
			.required('وارد کردن کدپستی اجباری است')
			.matches(/^[0-9]{10}$/, 'لطفاً کدپستی معتبر 10 رقمی وارد کنید'),
		homeAddress: Yup.string().required('وارد کردن آدرس محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		officeAddress: Yup.string().required('وارد کردن آدرس محل کار اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start '>
					<Input
						name={'country'}
						label={'کشور محل سکونت'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'state'}
						label={'استان محل سکونت'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'city'}
						label={'شهر محل سکونت'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'posrcode'}
						label={'کدپستی'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'homeAddress'}
						label={'آدرس محل سکونت'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'officeAddress'}
						label={'آدرس محل کار'}
						formik={formik}
						type={'text'}
					/>
				</div>
				<NextPrev prevStep={prevStep}/>

			</form>
		</div>
	);
};

export default Step02;
