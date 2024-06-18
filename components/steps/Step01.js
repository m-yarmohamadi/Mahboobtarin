import Input from '@/tools/Input';
import Select from '@/tools/Select';
import { Formik } from 'formik';
import React from 'react';
const Nationality = [
	{ id: 1, name: 'ایرانی' },
	{ id: 2, name: 'اتباع خارجی' },
];
const Sex = [
	{ id: 1, name: 'زن' },
	{ id: 2, name: 'مرد' },
];

const Step01 = ({formik,onSubmit}) => {
	return (
		<div className='w-full '>
			<form onSubmit={onSubmit} className='w-full '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
					<Input
						name={'firstName'}
						title={'نام'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'lastName'}
						title={'نام خانوادگی'}
						formik={formik}
						type={'text'}

					/>

					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'sex'}
							title={'جنسیت'}
							options={Sex}

						/>
						<Select
							name={'nationality'}
							title={'ملیت'}
							options={Nationality}

						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'melliCode'}
							title={'کد ملی'}
							formik={formik}
							type={'text'}

						/>
						<Input
							name={'passportNumber'}
							title={'شماره پاسپورت'}
							formik={formik}
							type={'text'}

						/>
					</div>
					<Input
						name={'birthDay'}
						title={'تاریخ تولد'}
						formik={formik}
						type={'date'}

					/>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'mobile'}
							title={'شماره تلفن همراه'}
							formik={formik}
							type={'text'}

						/>
						<Input
							name={'email'}
							title={'ایمیل'}
							formik={formik}
							type={'text'}

						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Step01;
