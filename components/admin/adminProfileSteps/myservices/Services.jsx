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
		<
	);
}
