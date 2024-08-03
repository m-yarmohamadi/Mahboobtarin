import Input from '@/tools/Input';
import Select from '@/tools/Select';
import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import { IoMdAdd } from 'react-icons/io';

const serviceList = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'مشاوره متنی', value: 'Text advice' },
	{ id: 2, label: 'مشاوره صوتی اینترنتی', value: 'Internet audio consultation' },
	{ id: 3, label: 'مشاوره تلفنی', value: 'on phone consultancy' },
	{ id: 4, label: 'مشاوره ویدیویی', value: 'Video consultation' },
	{ id: 5, label: 'دعوتنامه', value: 'Invitation' },
	{ id: 6, label: 'سمینار (آموزش)', value: 'seminar (training)' },
	{ id: 7, label: 'تبلیغات', value: 'Advertising' },
	{ id: 8, label: 'مشارکت در کلینیک', value: 'Participation in the clinic' },
	{ id: 9, label: 'حمایت', value: 'Protection' },
	{ id: 10, label: 'نوبت حضوری مطب', value: 'Appointment in the office' },
];

export default function Services({ formik }) {
	const [selected, setSelected] = useState({ title: 0, subject: 0 });
	const { service } = formik.values;

	const addService = () => {
		if (selected.title !== 0 && selected.subject !== 0) {
			formik.setFieldValue('service', [...service, { title: selected.title, subject: selected.subject }]);
			setSelected({ title: 0, subject: 0 });
		}
	};

	const removeService = (value) => {
		formik.setFieldValue(
			'service',
			service.filter((i) => service.indexOf(i) !== service.indexOf(value))
		);
	};

	return (
		<div className='lg:col-span-2'>
			<div className='flex items-end gap-4'>
				<div className='flex-1 flex flex-col lg:flex-row gap-4'>
					<Select
						label='نوع خدمت'
						options={serviceList}
						value={selected.title}
						onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
					/>
					<Input
						label='قیمت'
						value={selected.subject}
						onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
					/>
				</div>
				<button
					onClick={addService}
					type='button'
					className='btn btn--outline !p-2 !rounded-full mb-1'>
					<IoMdAdd className='w-6 h-6' />
				</button>
			</div>
			{service.length !== 0 && (
				<div className='w-full border border-slate-300 rounded-md mt-3'>
					{service.map((item, index) => (
						<div
							key={index}
							className='flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0'>
							<div className='flex-1 flex items-center gap-1'>
								<p className='text-sm font-medium w-1/2'>{item.title}</p>{' '}
								<span className=' w-24 text-xs flex justify-between items-center'>
									<span className='text-primary-01 font-bold'>{item.subject} </span>
									<span>تومان</span>
								</span>
							</div>
							<button
								onClick={() => removeService(item)}
								type='button'>
								<HiOutlineTrash className='w-5 h-5 text-red-600' />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
