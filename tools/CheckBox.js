import { enToFaNumber } from '@/utils/enToFa';
import React from 'react';

const CheckBox = ({ name, formik }) => {
	return (
		<div>
			<div className='flex items-center my-2'>
				<input
					type='checkbox'
					id={name}
					name={name}
					value={true}
					{...formik.getFieldProps(name)}

					className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
				/>
				<label
					htmlFor={name}
					className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
					قوانین وب سایت را خواندم و محتوای آن را می پذیرم.
				</label>
			</div>
			<div className='w-full flex justify-start items-start'>{formik.errors[name] && formik.touched[name] && <p className='error_Message'>{enToFaNumber(`${formik.errors[name]}`)}</p>}</div>
		</div>
	);
};

export default CheckBox;
