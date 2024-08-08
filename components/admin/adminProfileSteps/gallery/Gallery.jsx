import Modal from '@/components/Modal';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateGalleryForm from './CreateGalleryForm';
import { HiOutlineTrash } from 'react-icons/hi2';
import { FaImages } from 'react-icons/fa';

export default function Gallery() {
	const [galleryList, setGalleryList] = useState([]);
	const [open, setOpen] = useState(false);

	const deleteHandler = (id) => {
		setGalleryList((pervList) => pervList.filter((g) => g.id !== id));
	};

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
				<div className='w-full grid grid-cols-2 gap-4 md:grid-cols-4'>
					{galleryList.map((item, index) => (
						<GalleryItem
							key={index}
							data={item}
							onDelete={() => deleteHandler(item.id)}
						/>
					))}
				</div>
			</div>
			<div className='w-full flex justify-end items-center py-2'>
				<button className='btn btn--primary px-3'>ثبت تغییرات</button>
			</div>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title='ویدیو/تصویر جدید'>
				<CreateGalleryForm
					onClose={() => setOpen(false)}
					setGallery={setGalleryList}
				/>
			</Modal>
		</div>
	);
}

function GalleryItem({ data, onDelete }) {
	return (
		<div className='flex flex-col gap-2 relative bg-primary-01 bg-opacity-10 rounded-lg p-1'>
			{data.src.type.split('/')[0] === 'image' ? (
				<div className='aspect-video rounded-lg overflow-hidden'>
					<img
						src={URL.createObjectURL(data.src)}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>
			) : (
				<div className='aspect-video rounded-lg overflow-hidden'>
					<video
						controls
						className='w-full h-full object-cover'>
						<source
							src={URL.createObjectURL(data.src)}
							type='video/mp4'
						/>
					</video>
				</div>
			)}
			<h3 className='w-full text-md text-gray-800 font-bold px-2'>{data.title}</h3>
			<button
				onClick={onDelete}
				className='btn btn--danger absolute top-2 left-2 !p-1'>
				<HiOutlineTrash className='w-5 h-5' />
			</button>
		</div>
	);
}
