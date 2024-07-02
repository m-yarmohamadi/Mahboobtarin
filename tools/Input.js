import React from 'react';

const Input = ({ name, title, type, formik }) => {
	return (
		<div className='w-full py-1'>
			<label
				className='text-sm font-bold px-2'
				htmlFor={name}>
				{title}
			</label>
			<input
				className='w-full bg-gray-200 text-gray-700 border  border-primary-01 border-opacity-15 focus:border-opacity-100 rounded-md py-2 px-4   focus:outline-none focus:bg-white '
				type={type}
				name={name}
				{...formik.getFieldProps(name)}
			/>
			<div className=' text-start h-4'>{formik.errors[name] && formik.touched[name] && <p className=' text-xs text-start text-rose-400'>{t(formik.errors[name])}</p>}</div>
		</div>
	);
};

export default Input;
