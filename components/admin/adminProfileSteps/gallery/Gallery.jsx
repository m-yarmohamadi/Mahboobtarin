import Modal from '@/components/Modal';
import { useEffect, useMemo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateGalleryForm from './CreateGalleryForm';
import { HiOutlineTrash } from 'react-icons/hi2';
import { FaImages } from 'react-icons/fa';
import useProfile from '@/hooks/useProfile';
import useGetExpertiseUser from '@/hooks/useExpertiseUser';
import Loading from '@/tools/Loading';
import TabGroup from '@/tools/TabGroup';
import PictureGallery from './PictureGallery';
import VideoGallery from './VideoGallery';
import VoiceGallery from './VoiceGallery';

export default function Gallery() {
	const { user, isLoading } = useProfile();
	const [open, setOpen] = useState(false);

	const tabs = [
		{ label: "عکس", name: "picture", component: <PictureGallery user={user}/> },
		{ label: "فیلم", name: "video", component: <VideoGallery user={user} /> },
		{ label: "صوت", name: "voice", component: <VoiceGallery user={user} /> }
	];


	if (isLoading) return (
		<div className='w-full h-screen lg:h-full flex items-center justify-center'>
			<Loading customeColor="#0693a4" />
		</div>
	)

	return (
		<div className='h-full w-full flex flex-col '>
			<div>
				<div className='w-full flex items-end justify-between mb-7 pb-1'>
					<div className='text-2xl text-slate-800 font-semibold'>گالری</div>
					<div className='text-primary-01 text-sm  h-full flex justify-center items-end'>لطفاً عکس ها و فیلمهای مورد علاقه خود را با یک تیتر کوتاه در این قسمت درج کنید.</div>
					{/* <button
						onClick={() => setOpen(true)}
						className='w-28 btn btn--primary px-3 flex justify-between items-center'>
						<span>افزودن</span>
						<FaImages className='w-5 h-5' />
					</button> */}
				</div>
				{/* <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4'>
					{gallery?.map((item, index) => (
						<GalleryItem
							key={index}
							data={item}
							userID={user.unique_url_id}
						/>
					))}
				</div> */}
			</div>
			<TabGroup tabs={tabs} />

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

