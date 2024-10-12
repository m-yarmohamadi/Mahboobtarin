import { enToFaNumber } from '@/utils/enToFa';
import React from 'react';

const Select = ({ name, label, options, required, formik, onChange, value, disabled, onClickSelect, noError=false }) => {
	return (
		<div className='w-full py-1 flex flex-col justify-start justify-items-start items-start'>
			<label
				className='text-sm font-bold px-2 inline-block mb-2 text-slate-800'
				htmlFor={name}>
				{label}
				{required && <span style={{color:"red", fontSize:"18px", display:"inline-block", marginRight:"4px"}}>*</span>}
			</label>
			<div className='w-full '>
				<select
					className='w-full appearance-none bg-transparent text-gray-700 border  border-primary-01 border-opacity-15 focus:border-opacity-100 rounded-md py-2 px-4   focus:outline-none focus:bg-white'
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					onClick={onClickSelect}
					disabled={disabled}
					{...formik?.getFieldProps(name)}>
					{options.map((item, index) => {
						return (
							<option
								value={item.value}
								key={index}>
								{item.label}
							</option>
						);
					})}
				</select>
				{formik?.errors[name] && formik?.touched[name] && !noError && 
				<div className='w-full flex justify-start items-start mt-2'>
					<p className='error_Message'>
						{enToFaNumber(`${formik?.errors[name]}`)}
					</p>
				</div>
				}
			</div>
		</div>
	);
};

export default Select;
