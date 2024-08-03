import { useFormik } from 'formik';
import * as Yup from 'yup';
import useProfile from '@/hooks/useProfile';
import Linkdin from './Linkdin';

export default function MyLinkdin() {
	const { linkdin } = useProfile();

	const initialValues = {
		linkdin: linkdin || [],
	};

	const onSubmit = (values) => {
		const linkdinData = {
			linkdin: values.linkdin,
		};

		const data = new FormData();

		for (const key in linkdinData) {
			if (Array.isArray(linkdinData[key]) && linkdinData[key].length > 0) {
				data.append(key, JSON.stringify(linkdinData[key]));
			} else {
				data.append(key, linkdinData[key]);
			}
		}
		// mutateUpdateProfile(data, {
		//     onSuccess: ({ data }) => {
		//         if (data.status === 200) {
		//             toast.success("پروفایل شما با موفقیت ویرایش شد");
		//             queryClient.invalidateQueries({ queryKey: ["get-profile"] });
		//         }
		//     },
		//     onError: (error) => {
		//         toast.error("خطا در ویرایش پروفایل!")
		//     }
		// })
	};

	const validationSchema = Yup.object({});

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
						<Linkdin formik={formik} />
					</div>
				</form>
			</div>
			<div className='w-full flex justify-end items-center'>
							<button className='bg-primary-01 text-white px-8 py-2 rounded-md font-bold hover:bg-opacity-90'>ثبت تغییرات</button>

			</div>
		</div>
	);
}
