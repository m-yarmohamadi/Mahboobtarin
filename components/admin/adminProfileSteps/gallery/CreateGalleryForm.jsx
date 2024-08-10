import Input from '@/tools/Input';
import { useFormik } from 'formik';
import { BiEditAlt } from 'react-icons/bi';
import { GoPlusCircle } from 'react-icons/go';
import * as Yup from 'yup';

export default function CreateGalleryForm({ onClose, setGallery }) {
	const onSubmit = (values, { resetForm }) => {
		onClose();
		setGallery((pervList) => [...pervList, { id: Date.now(), title: values.title, src: values.src }]);
		resetForm();
	};

	const formik = useFormik({
		initialValues: { title: '', src: '' },
		onSubmit,
		validationSchema: Yup.object({
			title: Yup.string().required('عنوان را وارد کنید'),
			src: Yup.string().required('تصویر یا ویدیو را انتخاب کنید'),
		}),
	});

	return (
		<form
			className='w-full space-y-4'
			onSubmit={formik.handleSubmit}>
			<div>
				<input
					type='file'
					hidden
					id='src-gallery'
					accept='image/*, video/*'
					onChange={(e) => formik.setFieldValue('src', e.target.files[0])}
				/>
				{formik.values.src ? (
					formik.values.src.type.split('/')[0] === 'image' ? (
						<div className='aspect-video rounded-lg relative'>
							<img
								src={URL.createObjectURL(formik.values.src)}
								alt=''
								className='w-full h-full rounded-lg object-cover'
							/>

							<label
								htmlFor='src-gallery'
								className='btn btn--secondary cursor-pointer !p-2 absolute top-4 right-4'>
								<BiEditAlt className='w-5 h-5' />
							</label>
						</div>
					) : (
						<div className='aspect-video rounded-lg relative overflow-hidden'>
							<video
								controls
								className='w-full h-full object-cover'>
								<source
									src={URL.createObjectURL(formik.values.src)}
									type='video/mp4'
								/>
							</video>

							<label
								htmlFor='src-gallery'
								className='btn btn--secondary cursor-pointer !p-2 absolute top-4 right-4'>
								<BiEditAlt className='w-5 h-5' />
							</label>
						</div>
					)
				) : (
					<>
						<label
							htmlFor='src-gallery'
							className='text-primary-01 cursor-pointer text-xs font-semibold w-full flex flex-col justify-center items-center gap-2 py-7 border border-dashed border-slate-300 rounded-lg'>
							<GoPlusCircle className='w-12 h-12' />
							برای افزودن تصویر یا ویدیو کلیک کنید
						</label>
						<div className='w-full flex justify-start items-start mt-2'>{formik?.errors.src && formik?.touched.src && <p className='error_Message'>{formik?.errors.src}</p>}</div>
					</>
				)}
			</div>
			<Input
				label='عنوان'
				type='text'
				name='title'
				formik={formik}
			/>
			<div className='w-full flex items-center gap-4'>
				<button
					type='submit'
					className='btn btn--primary flex-1'>
					ثبت
				</button>
				<button
					onClick={() => onClose()}
					type='button'
					className='btn btn--outline flex-1'>
					لغو
				</button>
			</div>
		</form>
	);
}
