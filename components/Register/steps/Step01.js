import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { toastFunction } from '@/utils/Toast';
import { useState } from 'react';
import { Countries } from '@/data/countries';

const Nationality = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 2, label: 'ایرانی', value: 'iran' },
	{ id: 3, label: 'اتباع خارجی', value: 'noiran' },
];
const gender = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 2, label: 'زن', value: 'woman' },
	{ id: 3, label: 'مرد', value: 'man' },
];

const daysArray = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString();
    return { id: day, label: day, value: day };
});

const monthsArray = [
    { id: '0', label: 'ماه تولد انتخاب کنید', value: '' },
    { id: '1', label: 'January', value: '01' },
    { id: '2', label: 'February', value: '02' },
    { id: '3', label: 'March', value: '03' },
    { id: '4', label: 'April', value: '04' },
    { id: '5', label: 'May', value: '05' },
    { id: '6', label: 'June', value: '06' },
    { id: '7', label: 'July', value: '07' },
    { id: '8', label: 'August', value: '08' },
    { id: '9', label: 'September', value: '09' },
    { id: '10', label: 'October', value: '10' },
    { id: '11', label: 'November', value: '11' },
    { id: '12', label: 'December', value: '12' }
];

const currentYearMiladi = new Date().getFullYear();
const startYearMiladi = 1921;
const yearsArray = Array.from({ length: currentYearMiladi - startYearMiladi + 1 }, (_, i) => {
    const year = (startYearMiladi + i).toString();
    return { id: year, label: year, value: year };
});


const Step01 = ({ formik, children }) => {
	const [selectedDay, setSelectedDay] = useState(formik.values.birthday.split("-")[2] || "");
	const [selectedMonth, setSelectedMonth] = useState(formik.values.birthday.split("-")[1] || "");
    const [selectedYear, setSelectedYear] = useState(formik.values.birthday.split("-")[0] || "");
	const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));

	return (
		<div className='w-full h-full transition-all duration-1000 ease-in-out'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start '>
					<Input
						name={'name'}
						label={'نام'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'lastname'}
						label={'نام خانوادگی'}
						formik={formik}
						type={'text'}
					/>

					<Input
						name={'unique_url_id'}
						label={'نام کاربری'}
						formik={formik}
						type={'text'}
						smallDesc={'حداقل طول مجاز نام کاربری 6 کاراکتر حرف و عدد لاتین و خط فاصله است'}
					/>

					<Input
						name={'email'}
						label={'ایمیل'}
						formik={formik}
						type={'text'}
					/>

					<Select
						name={'nationality'}
						label={'ملیت'}
						options={sortedCountries}
						formik={formik}
					/>

					<div className='flex justify-between items-start gap-4'>
						{formik.values.nationality === 'Iran' && (
							<Input
								name={'national_code'}
								label={'کد ملی'}
								formik={formik}
								type={'text'}
							/>
						)}
						{formik.values.nationality !== 'Iran' && (
							<Input
								name={'passport_number'}
								label={'شماره پاسپورت'}
								formik={formik}
								type={'text'}
							/>
						)}
					</div>
					<div className='flex flex-col gap-1'>
						<div className='flex items-end gap-2'>
							<Select
								label="تاریخ تولد"
								name={"day"}
								options={[{ id: "0", label: "روز تولد را انتخاب کنید", value: "" }, ...daysArray]}
								onChange={(e)=>{
									setSelectedDay(e.target.value);
									formik.setFieldValue("birthday", `${selectedYear}-${selectedMonth}-${e.target.value}`)
								}}
								value={selectedDay}
							/>
							<Select
								name={"month"}
								options={monthsArray}
								onChange={(e)=>{
									setSelectedMonth(e.target.value);
									formik.setFieldValue("birthday", `${selectedYear}-${e.target.value}-${selectedDay}`)
								}}
								value={selectedMonth}
							/>
							<Select
								name={"year"}
								options={[{ id: "0", label: "سال تولد را انتخاب کنید", value: "" }, ...yearsArray]}
								onChange={(e)=>{
									setSelectedYear(e.target.value);
									formik.setFieldValue("birthday", `${e.target.value}-${selectedMonth}-${selectedDay}`)
								}}
								value={selectedYear}
							/>
						</div>
						<div className='w-full flex justify-start items-start'>
							{formik?.errors.birthday && formik?.touched.birthday && 
							<p className='error_Message'>
								{formik?.errors.birthday}
							</p>
							}
						</div>
					</div>
					<div className='flex justify-between items-start gap-4'>
					<Select
						name={'gender'}
						label={'جنسیت'}
						options={gender}
						formik={formik}
					/>
						
					</div>
				</div>
				{children}
			</form>
		</div>
	);
};

export default Step01;
