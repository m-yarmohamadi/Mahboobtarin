import { addGallery } from '@/services/expertApi/galleryService';
import Input from '@/tools/Input';
import Loading from '@/tools/Loading';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { BiEditAlt } from 'react-icons/bi';
import { GoPlusCircle } from 'react-icons/go';
import * as Yup from 'yup';

export default function CreateGalleryForm({ onClose, userID }) {
	const { mutateAsync: mutateAddGallery, isPending } = useMutation({ mutationFn: addGallery });
	const queryClient = useQueryClient();


	const onSubmit = async (values, { resetForm }) => {
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("file", values.src);
		formData.append("type", values.src.type.split("/")[0]);

		try {
			const { data } = await mutateAddGallery(formData);
			if (data) {
				toast.success("با موفقیت اضافه شد");
				onClose();
				queryClient.invalidateQueries({ queryKey: ["get-expertise-user-by-id"] });
				resetForm();
			}

		} catch (error) {
			if (error?.response?.status === 413) {
				toast.error("حجم فایل بالاست");
			}

			if (error?.response?.status === 401) {
				toast.error("وارد حساب کاربری خود شوید");
				window.location.reload();
			}
		}
	};

	const importFileHandler = (e) => {
		const file = e.target.files[0];
		const maxImageSizeInMB = 3;
		const maxVideoSizeInMB = 5;
		const maxImageSizeInBytes = maxImageSizeInMB * 1024 * 1024;
		const maxVideoSizeInBytes = maxVideoSizeInMB * 1024 * 1024;

		const fileType = file.type.split('/')[0];
		
		if (fileType === 'image' && file.size > maxImageSizeInBytes) {
			toast.error(`حجم تصویر نباید بیشتر از ${maxImageSizeInMB} مگابایت باشد`);
			return;
		}

		if (fileType === 'video' && file.size > maxVideoSizeInBytes) {
			toast.error(`حجم ویدیو نباید بیشتر از ${maxVideoSizeInMB} مگابایت باشد`);
			return;
		}

		formik.setFieldValue('src', file);
	}

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
					accept='image/png, image/gif, image/jpeg , image/jpg, video/*'
					onChange={importFileHandler}
				/>
				{formik.values.src ? (
					formik.values.src.type.split('/')[0] === 'image' ? (
						<div className='relative'>
							<div className='aspect-w-16 aspect-h-9 rounded-lg'>
								<img
									src={URL.createObjectURL(formik.values.src)}
									alt=''
									className='w-full h-full rounded-lg object-cover'
								/>
							</div>
							<label
								htmlFor='src-gallery'
								className='btn btn--secondary cursor-pointer !p-2 absolute top-4 right-4'>
								<BiEditAlt className='w-5 h-5' />
							</label>
						</div>
					) : (
						<div className='relative'>
							<div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
								<video
									controls
									className='w-full h-full object-cover'>
									<source
										src={URL.createObjectURL(formik.values.src)}
										type='video/mp4'
									/>
								</video>
							</div>
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
							className='text-primary-01 cursor-pointer text-xs font-semibold w-full flex flex-col justify-center items-center gap-2 py-7 border border-dashed border-slate-400 rounded-lg'>
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
					{isPending ? <Loading /> : "ثبت"}
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
