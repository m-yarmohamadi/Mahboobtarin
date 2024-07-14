import { enToFaNumber } from '@/utils/enToFa';
import React from 'react';

const Input = ({ name, label, type, formik, display='block' }) => {
	return (
		<div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start ${display}`}>
			<label
				className='text-sm font-bold px-2'
				htmlFor={name}>
				{label}
			</label>
			<input
				className='w-full bg-gray-200 text-gray-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg focus:shadow-red-300 transition-all duration-300 ease-in-out '
				type={type}
				name={name}
				{...formik.getFieldProps(name)}
			/>
			<div className='w-full flex justify-start items-start'>{formik.errors[name] && formik.touched[name] && <p className='error_Message'>{enToFaNumber(`${formik.errors[name]}`)}</p>}</div>
		</div>
	);
};

export default Input;
