import React from 'react';
import { FaAngleLeft, FaFilter, FaHeart, FaRegHeart, FaShareAlt, FaSort, FaSortAmountDown, FaStar, FaStethoscope } from 'react-icons/fa';
import { FaLocationDot, FaPhoneFlip } from 'react-icons/fa6';
import GroupItem from './GroupItem';
import GroupTree from './GroupTree';
import { useGetExpertisesList } from '@/hooks/useExpertiseUser';
import Loading from '@/tools/Loading';

const GroupList = () => {
	const { data, isLoading } = useGetExpertisesList();
	if(isLoading) return  <Loading />
	return (
		<div className='w-full '>
			<div className='w-full grid grid-cols-12'>
				<div className='w-full col-span-3 bg-primary-03 bg-opacity-30 p-2 border border-primary-01 border-opacity-20 rounded-s-2xl border-e-0'>
					<div className='text-xs flex justify-center items-center w-full'>
						<input
							className='p-2 w-full rounded-sm rounded-ss-xl'
							type='text'
							name='search'
							value=''
							placeholder='جستجوی تخصصی'
						/>
					</div>
					<div>
						<div className='p-4'>
							{data.map((item)=>(
								<GroupTree key={item.id} label={item.title}>
									{item?.children_recursive.map((subItem) => (
										<GroupTree key={subItem.id} label={subItem.title}/>
									))}
								</GroupTree>
							))}
							{/* <GroupTree label='هنر'>
								<GroupTree label='زیرگروه 1-1'>
									<GroupTree label='زیرگروه 1-1-1' />
									<GroupTree label='زیرگروه 1-1-2' />
								</GroupTree>
								<GroupTree label='زیرگروه 1-2' />
							</GroupTree>
							<GroupTree label='ورزش'>
								<GroupTree label='زیرگروه 2-1' />
							</GroupTree>
							<GroupTree label='پزشکی'>
								<GroupTree label='زیرگروه 2-1' />
							</GroupTree>
							<GroupTree label='حقوق'>
								<GroupTree label='زیرگروه 2-1' />
							</GroupTree> */}
						</div>
					</div>
				</div>
				<div className='w-full col-span-9 p-4 flex flex-col justify-center items-center gap-4 border border-primary-01 border-opacity-20 rounded-e-2xl'>
					<div className='w-full flex justify-between items-center '>
						<div className='flex justify-start items-center gap-1 text-primary-03'>
							<span>پزشکان</span>
							<span>
								<FaAngleLeft />
							</span>
							<span>روانشناسی</span> 
							<span>
								<FaAngleLeft />
							</span>
							<span className='text-primary-01'>مشاوره خانواده</span>
						</div>
						<div className='flex justify-center items-center gap-4'>
							<button className=' border border-secondary-01 p-2 rounded-full flex justify-center items-center gap-2 text-secondary-01'>
                                <span><FaFilter /></span>
                                <span>فیلترها</span>
                                <span className='w-6 h-6 rounded-full bg-secondary-01 text-white flex justify-center items-center'>1</span>
                            </button>
							<button className=' border border-secondary-01 p-2 rounded-full flex justify-center items-center gap-2 text-secondary-01'>
                                <span><FaSortAmountDown />
                                </span>
                                <span>مرتب سازی</span>
                            </button>
						</div>
					</div>

					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<button
						type='button'
						className='px-4 py-2 border border-primary-01 rounded-md shadow-md hover:bg-primary-05'>
						نمایش موارد بیشتر
					</button>
				</div>
			</div>
		</div>
	);
};

export default GroupList;
