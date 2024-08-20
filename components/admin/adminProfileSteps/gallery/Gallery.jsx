import Modal from '@/components/Modal';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateGalleryForm from './CreateGalleryForm';
import { HiOutlineTrash } from 'react-icons/hi2';
import { FaImages } from 'react-icons/fa';
import useProfile from '@/hooks/useProfile';
import useGetExpertiseUser from '@/hooks/useExpertiseUser';
import Loading from '@/tools/Loading';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGallery } from '@/services/expertDashboardService';
import toast from 'react-hot-toast';

export default function Gallery() {
	const { user, isLoading } = useProfile();
	const { data, isLoading: iGetLinkdins } = useGetExpertiseUser(user?.id);
	const { gallery } = data || {};
	const [open, setOpen] = useState(false);

	if (isLoading || iGetLinkdins) return (
		<div className='w-full h-screen lg:h-full flex items-center justify-center'>
			<Loading customeColor="#0693a4" />
		</div>
	)

	return (
		<div className='h-full w-full flex flex-col justify-between '>
			<div>
				<div className='w-full flex items-end justify-between mb-7 pb-1 border-b border-b-slate-300'>
					<div className='text-2xl text-gray-800 font-semibold'>گالری</div>
					<div className='text-primary-01 text-sm  h-full flex justify-center items-end'>لطفاً عکس ها و فیلمهای مورد علاقه خود را با یک تیتر کوتاه در این قسمت درج کنید.</div>
					<button
						onClick={() => setOpen(true)}
						className='w-28 btn btn--primary px-3 flex justify-between items-center'>
						<span>افزودن</span>
						<FaImages className='w-5 h-5' />
					</button>
				</div>
				<div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4'>
					{gallery.map((item, index) => (
						<GalleryItem
							key={index}
							data={item}
							userID={user.id}
						/>
					))}
				</div>
			</div>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title='ویدیو/تصویر جدید'>
				<CreateGalleryForm
					onClose={() => setOpen(false)}
					userID={user?.id}
				/>
			</Modal>
		</div>
	);
}

function GalleryItem({ data, userID }) {
	const { mutateAsync: mutateDeleteGallery } = useMutation({ mutationFn: deleteGallery });
	const queryClient = useQueryClient();

	const deleteGalleryHandler = async (id) => {
		const formData = new FormData();
		formData.append("id", id);

		try {
			const data = await mutateDeleteGallery(formData);
			console.log(data);
			
			if (data) {
				toast.success("گالری مورد نظر حذف شد");
				queryClient.invalidateQueries({ queryKey: ['get-expertise-user-by-id', userID] });
			}

		} catch (error) {
			if (error?.response?.status === 401) {
				toast.error("لطفا وارد حساب کاربری خود شوید");
				window.location.reload();
			} else {
				toast.error("خطایی رخ داده است");
			}
		}
	}

	return (
		<div className='flex flex-col gap-2 relative bg-primary-01 bg-opacity-10 rounded-lg p-1'>
			{data.type === 'gallery-image' ? (
				<div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
					<img
						src={data.path}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>
			) : (
				<div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
					<video
						controls
						className='w-full h-full object-cover'>
						<source
							src={data.path}
							type='video/mp4'
						/>
					</video>
				</div>
			)}
			<h3 className='w-full text-md text-gray-800 font-bold px-2'>{data.title}</h3>
			<button onClick={() => deleteGalleryHandler(data.id)} className='btn btn--danger absolute top-2 left-2 !p-1'>
				<HiOutlineTrash className='w-5 h-5' />
			</button>
		</div>
	);
}
