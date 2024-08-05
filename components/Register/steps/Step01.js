import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { toastFunction } from '@/utils/Toast';
import { useState } from 'react';
import { Countries } from '@/data/countries';

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

const Step01 = ({ formik, children }) => {

	return (
		<div className='w-full h-full transition-all duration-1000 ease-in-out'>
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
							options={Countries}
							formik={formik}
						/>
					</div>

					<div className='flex justify-between items-start gap-4'>
						{formik.values.nationality === 'ایران' && (
							<Input
								name={'national_code'}
								label={'کد ملی'}
								formik={formik}
								type={'text'}
							/>
						)}
						{formik.values.nationality !== 'ایران' && (
							<Input
								name={'passport_number'}
								label={'شماره پاسپورت'}
								formik={formik}
								type={'text'}
							/>
						)}
					</div>
					<Input
						name={'birthday'}
						label={'تاریخ تولد'}
						formik={formik}
						type={'date'}
					/>
					<div className='flex justify-between items-start gap-4'>
						{/* <Input
							name={'mobile'}
							label={'شماره تلفن همراه'}
							formik={formik}
							type={'text'}
							placeholder={'+98'}
							dir='ltr'
						/> */}
						<Input
							name={'email'}
							label={'ایمیل'}
							formik={formik}
							type={'text'}
						/>
					</div>
				</div>
				{children}
			</form>
		</div>
	);
};

export default Step01;
