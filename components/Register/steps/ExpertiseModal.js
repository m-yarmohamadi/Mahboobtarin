import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Select from '@/tools/Select';
import Input from '@/tools/Input';
import { useGetExpertisesList } from '@/hooks/useExpertiseUser';
const Expertise = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'پزشکی', value: 'medical' },
	{ id: 2, label: 'سینما', value: 'cinema' },
	{ id: 3, label: 'نقاشی', value: 'Painting' },
	{ id: 4, label: 'معماری', value: 'architecture' },
];

const ExpertiseModal = ({ openExpertiseModal, setOpenExpertiseModal, formikExpertise }) => {
	const initialValues = {
		title: '',
		subject: '',
	};
	const { isLoading, transformExpertises } = useGetExpertisesList();

	const onSubmit = (values) => {
		formikExpertise.setFieldValue("expertise", [...formikExpertise.values.expertise, values]);
		setOpenExpertiseModal(false);
	};
	const validationSchema = Yup.object({
		title: Yup.string().required('وارد کردن موضوع تخصص اجباری است'),
		subject: Yup.string().required('وارد کردن عنوان تخصص اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(30, 'حداکثر 30 حرف وارد کنید'),
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
			open={openExpertiseModal}
			onClose={setOpenExpertiseModal}
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
								name={'title'}
								label={'موضوع تخصص'}
								options={!isLoading ? transformExpertises  :[]}
								formik={formik}
							/>
							<Input
								name={'subject'}
								label={'عنوان تخصص'}
								type={'text'}
								formik={formik}
							/>
							<div className='bg-gray-50 ps-4 py-3 sm:flex sm:flex-row-reverse '>
								<button
									type='submit'
									className='mt-3 inline-flex w-full justify-center rounded-md bg-primary-01 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-opacity-85 sm:mt-0 sm:w-auto'>
									ثبت
								</button>
								<button
									onClick={() => setOpenExpertiseModal(false)}
									type='submit'
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

export default ExpertiseModal;
