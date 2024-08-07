import Input from '@/tools/Input';
import { Countries } from '@/data/countries';
import Select from '@/tools/Select';
import { useGetCity, useGetProvinces } from '@/hooks/useCity';
import { useEffect, useState } from 'react';



const Step02 = ({formik, children, error}) => {
	const {transformProvinces} = useGetProvinces();
	const {transformCity} = useGetCity(Number(formik.values.province_id));
	const [firstLoad, setFirstLoad] = useState(true);
	const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));

	useEffect(()=>{
		if(!firstLoad){
			formik.setFieldValue("province_id", "");
			formik.setFieldValue("city_id", "");
		}
	},[formik.values.country])

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
						onClickSelect={()=>{
							setFirstLoad(false);
						}}
					/>
					{
						formik.values.country === "Iran" ?
						<>
						<Select
							name={'province_id'}
							label={'استان/ایالت'} 
							formik={formik}
							options={[{id:-1, label:"استان/ایالت را انتخاب کنید", value:""}, ...transformProvinces || []]}
						/>
						<Select
							name={'city_id'}
							label={'شهر محل سکونت'}
							formik={formik}
							options={[{id:-1, label:"استان/ایالت را انتخاب کنید", value:""}, ...transformCity || []]}
							disabled={!formik.values.province_id}
						/>
						</>
						:
						<>
						<Input
							name={'province_id'}
							label={'استان/ایالت'} 
							formik={formik}
						/>
						<Input
							name={'city_id'}
							label={'شهر محل سکونت'}
							formik={formik}
						/>
						</>
					}
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
