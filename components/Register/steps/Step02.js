import Input from '@/tools/Input';
import { Countries } from '@/data/countries';
import Select from '@/tools/Select';
import { useGetCity, useGetProvinces } from '@/hooks/useCity';
import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import Map from '@/components/mapComponent/Map';
import WorkAddress from './WorkAddress';



const Step02 = ({formik, children, error}) => {
	const {transformProvinces} = useGetProvinces();
	const {transformCity} = useGetCity(Number(formik.values.province_id));
	const [firstLoad, setFirstLoad] = useState(true);
	const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));
	const [openMap, setOpenMap] = useState(false);

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
							options={[{id:-1, label:"شهر محل سکونت را انتخاب کنید", value:""}, ...transformCity || []]}
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
					<div className='grid grid-cols-1  gap-4 w-full items-start pt-4'>
						<Input
							name={'address'}
							label={'آدرس محل سکونت'}
							formik={formik}
							type={'text'}
						/>
						<WorkAddress formik={formik} name={'address_work'}/>
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
