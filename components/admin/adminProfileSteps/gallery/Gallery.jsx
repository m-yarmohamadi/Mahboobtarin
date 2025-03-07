import Modal from '@/components/Modal';
import { useEffect, useMemo, useState } from 'react';
import CreateGalleryForm from './CreateGalleryForm';
import useProfile from '@/hooks/useProfile';
import Loading from '@/tools/Loading';
import TabGroup from '@/tools/TabGroup';
import PictureGallery from './PictureGallery';
import VideoGallery from './VideoGallery';
import VoiceGallery from './VoiceGallery';
import AllGallery from './AllGallery';


export default function Gallery() {
	const { user, isLoading } = useProfile();
	const { user_level } = user || {};
	const LIMIT = !user?.is_verify && user_level === "Silver" ? { pic: 10, video: 2 } : { pic: Infinity, video: Infinity };
	const [open, setOpen] = useState(false);

	const tabs = [
		{ label: "همه موارد" },
		{ label: "عکس" },
		{ label: "فیلم" },
		{ label: "صوت" }
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
				</div>
			</div>
			<TabGroup tabs={tabs}>
				<TabGroup.Item>
					<AllGallery user={user} />
				</TabGroup.Item>
				<TabGroup.Item>
					<PictureGallery user={user} limitCount={LIMIT.pic} />
				</TabGroup.Item>
				<TabGroup.Item>
					<VideoGallery user={user} limitCount={LIMIT.video} />
				</TabGroup.Item>
				<TabGroup.Item>
					<VoiceGallery user={user} limitCount={LIMIT.video} />
				</TabGroup.Item>
			</TabGroup>

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

