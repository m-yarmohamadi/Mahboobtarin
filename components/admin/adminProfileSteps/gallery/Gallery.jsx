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
	const LIMIT = "Gold";
	const [open, setOpen] = useState(false);

	const tabs = [
		{ label: "همه موارد" },
		{ label: "عکس" },
		{ label: "فیلم", limit: user_level === LIMIT },
		{ label: "صوت", limit: user_level === LIMIT }
	];
	const limitedTabs = tabs.filter((i) => !i.limit);


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
			<TabGroup tabs={limitedTabs}>
				<TabGroup.Item>
					<AllGallery user={user} />
				</TabGroup.Item>
				<TabGroup.Item>
					<PictureGallery user={user} LIMIT={LIMIT} />
				</TabGroup.Item>
				{
					user_level === LIMIT &&
					<>
						<TabGroup.Item>
							<VideoGallery user={user} />
						</TabGroup.Item>
						<TabGroup.Item>
							<VoiceGallery user={user} />
						</TabGroup.Item>
					</>
				}
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

