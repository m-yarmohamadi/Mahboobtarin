import Input from '@/tools/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { useState } from 'react';
import { Countries } from '@/data/countries';
import Select from '@/tools/Select';
import { useGetCity, useGetProvinces } from '@/hooks/useCity';



const Step02 = ({formik, children, error}) => {
	const {transformProvinces} = useGetProvinces();
	const {transformCity} = useGetCity(formik.values.province_id);
	const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));

	return (
		<div className='w-full h-full'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start '>
					<Select
						name={'country'}
						label={'کشور محل سکونت'}
						options={sortedCountries}
						formik={formik}
					/>
					<Select
						name={'province_id'}
						label={'استان/ایالت'} 
						formik={formik}
						options={transformProvinces || []}
					/>
					<Select
						name={'city_id'}
						label={'شهر محل سکونت'}
						formik={formik}
						options={transformCity || []}
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
