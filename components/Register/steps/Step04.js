import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import CheckBox from '@/tools/CheckBox';
import axios from 'axios';
import { useState } from 'react';
import Input from '@/tools/Input';
import OTPInput from 'react-otp-input';

const Step04 = ({ children, formik, error }) => {

	return (
		<div className='w-full h-full flex flex-col justify-between'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='w-full h-full flex flex-col justify-between'>
					<div className=' w-full  '>
						<h1 className='text-lg text-slate-800 font-bold py-3'>قوانین:</h1>
						<p className='text-justify overflow-y-scroll w-full h-36 mb-4 text-sm text-slate-600 leading-7 pl-5'>
							<Link href={'/rules'}>

								<span>
									قوانین و مقررات
								</span>
							</Link>

							استفاده از سایت را مطالعه کره ام						</p>
						<div className='w-auto'>
							<div className='inline-block py-2 px-4 bg-primary-02 rounded-lg'>
								<CheckBox
									name={'FinalApproval'}
									formik={formik}
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					{children}
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
