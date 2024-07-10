import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Select from '@/tools/Select';
const Language = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'ترکی', value: 'torki' },
	{ id: 2, label: 'کردی', value: 'kordi' },
	{ id: 3, label: 'لری', value: 'lori' },
	{ id: 4, label: 'تالشی', value: 'taleshi' },
	{ id: 5, label: 'عربی', value: 'arabic' },
	{ id: 6, label: 'بلوچ', value: 'baloochi' },
];
const Proficiency = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'خیلی ضعیف', value: 'VeryWeak' },
	{ id: 2, label: 'ضعیف', value: 'weak' },
	{ id: 3, label: 'متوسط', value: 'medium' },
	{ id: 4, label: 'خوب', value: 'good' },
	{ id: 5, label: 'خیلی خوب', value: 'veryGood' },
	{ id: 6, label: 'عالی', value: 'Excellent' },
];


const LanguageModal = ({ openLanguageModal, setOpenLanguageModal, setLanguage, language }) => {
	const initialValues = {
		language: '',
		proficiency: '',
	};
	const onSubmit = (values) => {
		setLanguage([...language, values]);
		setOpenLanguageModal(false);
	};
	const validationSchema = Yup.object({
		language: Yup.string().required('وارد کردن زبان و گویش اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		proficiency: Yup.string().required('وارد کردن میزان تسلط اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<Dialog
			open={openLanguageModal}
			onClose={setOpenLanguageModal}
			className='relative z-10'>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
			/>

<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
						<form
							onSubmit={formik.handleSubmit}
							className='w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
						<Select
							name={'language'}
							label={'زبان و گویش'}
							options={Language}
							formik={formik}
						/>
						<Select
							name={'proficiency'}
							label={'میزان تسلط'}
							options={Proficiency}
							formik={formik}
						/>
							<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
								<button
									type='submit'
									className='mt-3 inline-flex w-full justify-center rounded-md bg-primary-01 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
									ثبت
								</button>
								<button
									type='button'
									onClick={() => setOpenLanguageModal(false)}
									className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'>
									انصراف
								</button>
							</div>
						</form>

					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default LanguageModal;
