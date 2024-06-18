import React from 'react';

const Select = ({ name, label, options }) => {
	return (
		<div className='w-full py-1'>
			<label className='text-sm font-bold px-2' htmlFor={name}>
				{label}
			</label>
			<div className='w-full '>
				<select
					className='w-full bg-gray-200 text-gray-700 border  border-primary-01 border-opacity-15 focus:border-opacity-100 rounded-md py-2 px-4   focus:outline-none focus:bg-white'
					id={name}

				>
					{options.map((item) => {
						return <option key={item.id}>{item.name}</option>;
					})}
				</select>
			</div>
		</div>
	);
};

export default Select;
