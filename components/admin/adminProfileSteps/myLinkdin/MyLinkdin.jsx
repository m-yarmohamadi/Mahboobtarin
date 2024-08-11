import { useFormik } from 'formik';
import * as Yup from 'yup';
import Linkdins from './Linkdins';
import { useMutation } from '@tanstack/react-query';
import { addLinkdins } from '@/services/expertDashboardService';
import toast from 'react-hot-toast';

export default function MyLinkdin() {

	const initialValues = {
		title: "",
		source: "",
		link: ""
	};

	const { mutateAsync: mutateAddLinkdins, isPending } = useMutation({ mutationFn: addLinkdins });
	const onSubmit = async (values, { resetForm }) => {
		try {
			const { data } = await mutateAddLinkdins({
				title: values.title,
				source: values.source,
				link: values.link
			});

			if (data) {
				toast.success("خبر با موفقیت درج شد");
				resetForm();
			}

		} catch (error) {
			if (error?.response?.status === 401) {
				window.location.reload();
				toast.error("وارد حساب کاربری خود شوید");
			} else {
				toast.error("خطایی رخ داده");
			}
		}
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("تیتر خبر را وارد کنید"),
		source: Yup.string().required("منبع خبر را وارد کنید"),
		link: Yup.string().required("لینک خبر را وارد کنید"),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<div className='flex flex-col justify-between items-center w-full h-full'>
			<div className='w-full'>
				<div className='flex flex-col justify-center items-center gap-3 py-4'>
					<h1 className='text-lg text-gray-800 font-bold'>لینکدونی</h1>
					<p className='text-sm text-gray-600'>لطفا اخباری را که می توانید در بخش لینکدونی پروفایل خود ارائه دهید ثبت کنید.</p>
				</div>

				<form
					className='space-y-4'
					onSubmit={formik.handleSubmit}>
					<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
						<Linkdins formik={formik} loading={isPending} />
					</div>
				</form>
			</div>
			{/* <div className='w-full flex justify-end items-center'>
				<button className='bg-primary-01 text-white px-8 py-2 rounded-md font-bold hover:bg-opacity-90'>ثبت تغییرات</button>
			</div> */}
		</div>
	);
}
