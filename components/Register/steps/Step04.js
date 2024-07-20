import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import CheckBox from '@/tools/CheckBox';
import axios from 'axios';
import { useState } from 'react';
import Input from '@/tools/Input';
import OTPInput from 'react-otp-input';

const Step04 = ({ nextStep, prevStep, nationalCode }) => {
	const [error, setError] = useState([]);
	const [loading, setLoading] = useState(0);


	const initialValues = {
		FinalApproval: false,
	};
	const [otp, setOtp] = useState();
	const onSubmit = async (values) => {
		setLoading(1)
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				national_code:nationalCode,
				step: '4',
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
		FinalApproval: Yup.boolean().oneOf([true], 'شما باید قوانین وب سایت را تأیید کنید.'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});
	return (
		<div className='w-full h-full flex flex-col justify-between'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='w-full h-full flex flex-col justify-between'>
					<div className=' w-full  '>
						<h1 className='text-lg font-bold py-3'>قوانین:</h1>
						<p className='text-justify overflow-y-scroll w-full h-36 mb-4'>
							لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در
							این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
							باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
						</p>
						<div className='grid grid-cols-6'>
							<div className=' col-span-4 p-2 bg-primary-02'>
								<CheckBox
									name={'FinalApproval'}
									formik={formik}
								/>
							</div>
							<div className=' col-span-2 flex justify-center items-center px-6 w-56'></div>
						</div>
					</div>
				</div>
				<div>
					<NextPrev prevStep={prevStep} loading={loading} step={4} />
				</div>
			</form>
			{error &&
				error.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}
		</div>
	);
};

export default Step04;
