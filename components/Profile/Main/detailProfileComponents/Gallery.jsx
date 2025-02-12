import { useState } from 'react';
import TitleItems from '../TitleItems';
import TabGroup from '@/tools/TabGroup';
import { IoMdClose } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

export default function Gallery({ gallery }) {
	const [showMore, setShowMore] = useState(false);
	const [open, setOpen] = useState(null);

	const selectMediaHandler = (item) => {
		setOpen(gallery.indexOf(item));
	};

	if (gallery && gallery.length) {
		return (
			<div id="gallery" className="pb-16 scroll-mt-[130px] md:scroll-mt-20">
				<TitleItems title={'گالری'} />
				<TabGroup
					tabs={[{ label: 'همه' }, { label: 'عکس' }, { label: 'فیلم' }, { label: 'صوت' }]}
				>
					<AllGallery gallery={gallery} onOpenPopup={(e) => selectMediaHandler(e)} />
					<Pictures gallery={gallery} onOpenPopup={(e) => selectMediaHandler(e)} />
					<Videos gallery={gallery} onOpenPopup={(e) => selectMediaHandler(e)} />
					<Voices gallery={gallery} onOpenPopup={(e) => selectMediaHandler(e)} />
				</TabGroup>

				<PopupGallery open={open} onClose={() => setOpen(null)} gallery={gallery} />

				{gallery.length > 10 ? (
					<ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} />
				) : null}
			</div>
		);
	}
}

function AllGallery({ gallery, onOpenPopup }) {
	const sortedGallery = gallery.sort((a, b) => Number(b.ord) - Number(a.ord));

    return (
        <TabGroup.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
                {sortedGallery.filter((c) => c.type !== "gallery-audio").map((item) => {
                    return (
                        <div key={item.id} className="relative" onClick={() => onOpenPopup(item)}>
                            <div className="aspect-w-16 aspect-h-10">
                                {
                                    item.type === "gallery-image" ?
                                        <img
                                            src={item.path}
                                            className=" hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                            alt=""
                                        />
                                        :
                                        item.script ?
                                            <div dangerouslySetInnerHTML={{ __html: item.script }} className="!w-full !h-full !object-cover"></div>
                                            :
                                            <video
                                                controls
                                                className="hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                            >
                                                <source src={item.path} type="video/mp4" />
                                            </video>

                                }
                            </div>
                            <div className="w-full absolute bottom-0 right-0 flex items-center justify-center py-2 px-4">
                                <div className="w-full bg-black/70 text-[#fff] text-lg p-2 text-center">
                                    {item.title}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </TabGroup.Item>
    )
}

function Pictures({ gallery, onOpenPopup }) {
	const pictures = gallery && gallery.filter((g) => g.type === 'gallery-image');

	return (
		<TabGroup.Item>
			<div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
				{pictures.map((item) => {
					return (
						<div key={item.id} className="relative" onClick={() => onOpenPopup(item)}>
							<div className="aspect-w-16 aspect-h-10">
								<img
									src={item.path}
									className=" hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
									alt=""
								/>
							</div>
							<div className="w-full absolute bottom-0 right-0 flex items-center justify-center py-2 px-4">
								<div className="w-full bg-black/70 text-[#fff] text-lg p-2 text-center">
									{item.title}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</TabGroup.Item>
	);
}

function Videos({ gallery, onOpenPopup }) {
    const video = gallery && gallery.filter((g) => g.type === "gallery-video");

    return (
        <TabGroup.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
                {video.map((item) => {
                    return (
                        <div key={item.id} className="relative" onClick={() => onOpenPopup(item)}>
                            <div className="aspect-w-16 aspect-h-10">
                                {item.script ?
                                    <div dangerouslySetInnerHTML={{ __html: item.script }} className="!w-full !h-full !object-cover"></div>
                                    :
                                    <video
                                        controls
                                        className="hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                    >
                                        <source src={item.path} type="video/mp4" />
                                    </video>
                                }
                            </div>
                            <div className="w-full absolute bottom-0 right-0 flex items-center justify-center py-2 px-4">
                                <div className="w-full bg-black/70 text-[#fff] text-lg p-2 text-center">
                                    {item.title}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </TabGroup.Item>

    )
}

function Voices({ gallery, onOpenPopup }) {
	const voice = gallery && gallery.filter((g) => g.type === 'gallery-audio');

	return (
		<TabGroup.Item>
			<div className="grid grid-cols-1 w-full gap-4 ">
				{voice.map((item) => {
					return (
						<div key={item.id} className="relative" onClick={() => onOpenPopup(item)}>
							<span className="flex px-2 pb-4 w-full text-sm font-semibold p-1 text-slate-800">
								{item.title}
							</span>
							<div className="w-full">
								{item.script !== 'null' ? (
									<div
										dangerouslySetInnerHTML={{ __html: item.script }}
										className="!w-full !h-full !object-cover"
									></div>
								) : (
									<audio controls className="w-full">
										<source src={item.path} type="audio/mpeg" />
										مرورگر شما پخش صوت را پشتیبانی نمی‌کند.
									</audio>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</TabGroup.Item>
	);
}

function PopupGallery({ onClose, open, gallery }) {
	if (open === null) return null;

	return (
		<>
			<div
				onClick={onClose}
				className="w-full h-full fixed top-0 right-0 bg-slate-900 opacity-60 z-50"
			></div>
			<div className="w-full flex flex-col gap-6 max-w-[650px] bg-white shadow-lg dark:shadow-darkLg rounded-xl p-6 fixed top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-50">
				<div className="w-full flex items-center justify-between font-bold text-slate-800 border-b border-slate-300 pb-4">
					<div></div>
					<button
						type="button"
						onClick={onClose}
						className="p-2 rounded-full border border-primary-02"
					>
						<IoMdClose className="w-6 h-6" />
					</button>
				</div>

				<div>
					<Swiper
						modules={[Navigation]}
						spaceBetween={26}
						initialSlide={open}
						navigation={{
							nextEl: '#gallery-btn-next',
							prevEl: '#gallery-btn-prev',
						}}
					>
						{gallery
							.filter((c) => c.type !== 'gallery-audio')
							.map((item, index) => (
								<SwiperSlide key={index}>
									<div key={item.id} className="relative">
										<div className="aspect-w-16 aspect-h-10">
											{item.type === 'gallery-image' ? (
												<img
													src={item.path}
													className="object-cover w-full h-full object-center rounded-md"
													alt=""
												/>
											) : (
												<video
													controls
													className="object-cover w-full h-full object-center rounded-md"
												>
													<source src={item.path} type="video/mp4" />
												</video>
											)}
										</div>
										<div className="w-full text-lg font-semibold text-slate-800 py-4 px-5">
											{item.title}
										</div>
									</div>
								</SwiperSlide>
							))}
					</Swiper>
					<div className="flex items-center justify-center gap-3">
						<button
							id="gallery-btn-prev"
							className="disabled:opacity-50 btn btn--outline !p-2 bg-white"
						>
							<FaArrowRightLong className="w-5 h-5" />
						</button>
						<button
							id="gallery-btn-next"
							className="disabled:opacity-50 btn btn--outline !p-2 bg-white"
						>
							<FaArrowLeftLong className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
