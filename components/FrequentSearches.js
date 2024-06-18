import React from 'react';
import PN from 'persian-number';
import { FaChevronLeft } from 'react-icons/fa';

const data = [
	{
		id: 1,
		iconUrl: '/images/Adolescence.png',
		title: 'نوجوانی و بلوغ',
		subtitle: 'استقلال، مسئولیت پذیری، اعتماد به نفس',
		picUrl: [
			{
				id: 1,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 2,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 3,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 4,
				url: '/images/FaribaEghdami.webp',
			},
		],
		number: 315,
	},
	{
		id: 2,
		iconUrl: '/images/addiction.png',
		title: 'ترک اعتیاد',
		subtitle: 'سیگار، ماریجوانا، متادون، همسر معتاد',
		picUrl: [
			{
				id: 1,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 2,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 3,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 4,
				url: '/images/FaribaEghdami.webp',
			},
		],
		number: 143,
	},
	{
		id: 3,
		iconUrl: '/images/Marriage.png',
		title: 'ازدواج موفق و رابطه زناشویی پایدار',
		subtitle: 'انتخاب همسر، شکست عاطفی، خیانت',
		picUrl: [
			{
				id: 1,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 2,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 3,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 4,
				url: '/images/FaribaEghdami.webp',
			},
		],
		number: 26,
	},
	{
		id: 4,
		iconUrl: '/images/SexCounseling.png',
		title: 'مشاوره جنسی',
		subtitle: 'اختلالات، ناتوانی، اعتماد به نفس، تمایلات',
		picUrl: [
			{
				id: 1,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 2,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 3,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 4,
				url: '/images/FaribaEghdami.webp',
			},
		],
		number: 72,
	},
	{
		id: 5,
		iconUrl: '/images/jobPosition.png',
		title: 'موفقیت شغلی و تحصیلی',
		subtitle: 'استعدادیابی، روابط مؤثر، خلاقیت',
		picUrl: [
			{
				id: 1,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 2,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 3,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 4,
				url: '/images/FaribaEghdami.webp',
			},
		],
		number: 85,
	},
	{
		id: 6,
		iconUrl: '/images/Anxiety.png',
		title: 'اضطراب، افسردگی و مسائل فردی',
		subtitle: 'وسواس، کنترل خشم و هیجان، ترس، تنهایی',
		picUrl: [
			{
				id: 1,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 2,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 3,
				url: '/images/FaribaEghdami.webp',
			},
			{
				id: 4,
				url: '/images/FaribaEghdami.webp',
			},
		],
		number: 315,
	},
];
const data2 = [
	{
		id: 1,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر هنرمندان',
	},
	{
		id: 2,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر ورزشکاران',
	},
	{
		id: 3,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر پزشکان',
	},
	{
		id: 4,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر شاعران',
	},
	{
		id: 5,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر شاعران',
	},
	{
		id: 6,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر شاعران',
	},
	{
		id: 7,
		picUrl: [
			{
				id: 1,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 2,
				url: '/images/Mansoor.zabetian.jpg',
			},
			{
				id: 3,
				url: '/images/Mansoor.zabetian.jpg',
			},
		],
		title: 'مشاهده دیگر شاعران',
	},
];
const FrequentSearches = () => {
	return (
		<div className=' md:container px-8 md:px-0 pb-16'>
			<div className='md:grid grid-cols-3 gap-8 md:h-[40rem] md:max-h-[40rem] '>
				<div className=' col-span-2 '>
					<div className='flex justify-center items-center w-full text-2xl font-bold text-gray-800 p-2 pt-6 md:pt-2'>جستجوهای پرتکرار</div>
					<div className='xs:h-fit md:h-[38.5rem] md:max-h-[38.5rem] flex flex-col justify-between items-center bg-white  rounded-xl shadow-lg'>
						<div className='md:grid grid-cols-2 gap-8'>
							{data.map((item) => {
								return (
									<div
										key={item.id}
										className=' border-b border-gray-200 py-2 w-full flex flex-col justify-center items-center'>
										<div className='w-full grid grid-cols-12'>
											<div className='p-3 w-full col-span-3  flex justify-center items-center'>
												<div className='p-3 border border-primary-02 rounded-xl'>
													<img
														src={item.iconUrl}
														alt=''
													/>
												</div>
											</div>
											<div className='w-full col-span-9 flex flex-col justify-center items-center gap-2'>
												<div className='w-full flex justify-start items-start px-4'>
													<span className='font-bold text-xl '>{item.title}</span>
												</div>
												<span>{item.subtitle}</span>
											</div>
										</div>
										<div className='w-full  flex justify-center items-center'>
											<div className='flex justify-center items-center'>
												{item.picUrl.map((pic) => {
													return (
														<div
															key={pic.id}
															className='-ms-2'>
															<img
																className='w-10 h-10 rounded-full border border-white'
																src={pic.url}
																alt=''
															/>
														</div>
													);
												})}

												<div className='-ms-2'>
													<div className=' flex justify-center items-center w-10 h-10 rounded-full border border-white bg-white shadow-md text-sm font-bold hover:cursor-pointer hover:bg-primary-02'>{PN.convertEnToPe(`${item.number}`)}+</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className='w-full p-2 flex justify-end items-center gap-2 bg-primary-02 rounded-b-xl font-bold text-sm hover:cursor-pointer'>
							<span>همه تخصص ها</span>
							<span>
								<FaChevronLeft />
							</span>
						</div>
					</div>
				</div>
				<div className=''>
					<div className='flex justify-center items-center w-full text-2xl font-bold text-gray-800 p-2 pt-6 md:pt-2'>محبوب ترین های هفته</div>
					<div className='h-[38.5rem] max-h-[38.5rem] scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin  overflow-y-scroll flex flex-col justify-between items-center bg-white  rounded-xl shadow-lg '>
						{data2.map((item) => {
							return (
								<div key={item.id}>
									<div className='flex justify-center items-center pt-10 pb-3'>
										{item.picUrl.map((pic) => {
											return (
												<div
													key={pic.id}
													className='-ms-2'>
													<img
														className='w-20 h-20 rounded-full border-2 border-white'
														src={pic.url}
														alt=''
													/>
												</div>
											);
										})}
									</div>
									<div className=' flex justify-end items-center gap-2  font-bold text-md'>
										<span className=' text-primary-01'>{item.title}</span>
										<span>
											<FaChevronLeft />
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FrequentSearches;
