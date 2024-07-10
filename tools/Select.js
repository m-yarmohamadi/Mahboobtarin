import { enToFaNumber } from '@/utils/enToFa';
import React from 'react';

const Select = ({ name, label, options, formik }) => {
	return (
		<div className='w-full  py-1 flex flex-col justify-start justify-items-start items-start'>
			<label
				className='text-sm font-bold px-2'
				htmlFor={name}>
				{label}
			</label>
			<div className='w-full '>
				<select
					className='w-full bg-gray-200 text-gray-700 border  border-primary-01 border-opacity-15 focus:border-opacity-100 rounded-md py-2 px-4   focus:outline-none focus:bg-white'
					id={name}
					name={name}
					{...formik.getFieldProps(name)}>
					{options.map((item) => {
						return (
							<option
								value={item.label}
								key={item.id}>
								{item.label}
							</option>
						);
					})}
				</select>
				<div className='w-full flex justify-start items-start'>{formik.errors[name] && formik.touched[name] && <p className='error_Message'>{enToFaNumber(`${formik.errors[name]}`)}</p>}</div>
			</div>
		</div>
	);
};

export default Select;
