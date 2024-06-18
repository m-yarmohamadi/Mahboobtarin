import Input from '@/tools/Input';
import Select from '@/tools/Select';
import React from 'react';
const Expertise = [
	{ id: 1, name: 'پزشکی' },
	{ id: 2, name: 'سینما' },
	{ id: 3, name: 'نقاشی' },
	{ id: 4, name: 'معماری' },
];
const Grade = [
	{ id: 1, name: 'زیر دیپلم' },
	{ id: 2, name: 'دیپلم' },
	{ id: 3, name: 'کاردانی' },
	{ id: 4, name: 'کارشناسی' },
	{ id: 5, name: 'کارشناسی ارشد' },
	{ id: 6, name: 'دکتری' },
];
const Language = [
	{ id: 1, name: 'ترکی' },
	{ id: 2, name: 'کردی' },
	{ id: 3, name: 'لری' },
	{ id: 4, name: 'تالشی' },
	{ id: 5, name: 'عربی' },
	{ id: 6, name: 'بلوچ' },
];
const Proficiency = [
	{ id: 1, name: 'خیلی ضعیف' },
	{ id: 2, name: 'ضعیف' },
	{ id: 3, name: 'متوسط' },
	{ id: 4, name: 'خوب' },
	{ id: 5, name: 'خیلی خوب' },
	{ id: 6, name: 'عالی' },
];

const Step03 = () => {
	return (
		<div className='w-full h-full'>
			<form className='w-full h-full flex flex-col justify-between items-center'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'expertise'}
							title={'موضوع تخصص'}
							options={Expertise}
						/>
						<Input
							name={'expertiseName'}
							title={'عنوان تخصص'}
							type={'text'}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'grade'}
							title={'مقطع تحصیلی'}
							options={Grade}
						/>
						<Input
							name={'educationPlace'}
							title={'نام محل تحصیل'}
							type={'text'}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'language'}
							title={'زبان و گویش'}
							options={Language}
						/>
						<Select
							name={'proficiency'}
							title={'میزان تسلط'}
							options={Proficiency}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'specializedSystemCode'}
							title={'کد نظام تخصصی'}
							type={'text'}
						/>
						<Input
							name={'identificationCode'}
							title={'کد معرف'}
							type={'text'}
						/>
                        <button className='py-2 mt-5 rounded-md px-2 bg-primary-01 text-white flex justify-center items-center' type="">افزودن</button>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'password'}
							title={'کلمه عبور'}
							type={'text'}
						/>
						<Input
							name={'confirmPassword'}
							title={'تکرار کلمه عبور'}
							type={'text'}
						/>
					</div>
                    <Input
							name={'picture'}
							title={'عکس پروفایل'}
							type={'file'}
						/>

				</div>
			</form>
		</div>
	);
};

export default Step03;
