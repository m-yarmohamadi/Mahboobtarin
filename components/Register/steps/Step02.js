import Input from '@/tools/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { useState } from 'react';
import { Countries } from '@/data/countries';
import Select from '@/tools/Select';



const Step02 = ({formik, children, error}) => {

	return (
		<div className='w-full h-full'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start '>
				<Select
							name={'country'}
							label={'کشور محل اقامت'}
							options={Countries}
							formik={formik}
						/>
					<Input
						name={'province_id'}
						label={'استان/ایالت'} 
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
				{children}
			</form>
			{error &&
				error.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}

		</div>
	);
};

export default Step02;
