import React from 'react';
import Header from '../Header';
import Head from 'next/head';
import GroupSearchBox from './GroupSearchBox';
import News from '../News';
import Specialties from '@/data/Specialties';
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa';
import LoginregisterProfile from '../Profile/Main/LoginregisterProfile';
import GroupList from './GroupList';

const Groups = () => {
	return (
		<div>
			<Head>
				<title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | گروه ها`}</title>
			</Head>
			<GroupSearchBox />
			<div className='container -mt-40 px-10'>
				<div className='bg-white w-full h-full rounded-3xl container p-4'>
					<GroupList />
					<News />
					<div>
						<span className='w-full flex justify-center items-center p-2 font-bold'>سایر تخصص ها</span>
						<div className='w-full bg-primary-03 bg-opacity-15 shadow-lg h-full rounded-md'>
							<div className='grid grid-cols-4 justify-center items-center gap2 p-3'>
								{Specialties.map((item, index) => {
									return (
										<div key={index}>
											<span className='flex justify-between items-center gap-1 bg-primary-02 shadow-md text-xs p-2 m-1 rounded-md'>
												<span>{item}</span>
												<span>
													<FaAngleLeft />
												</span>
											</span>{' '}
										</div>
									);
								})}
							</div>
							<div className='w-full flex justify-center items-center py-2'>
								<div className='w-fit py-1 px-4 bg-primary-03 text-primary-02 flex justify-center items-center gap-2  rounded-md'>
									<span>
										<FaAngleDown />
									</span>
									<button type='button'>مشاهده بیشتر</button>
								</div>
							</div>
						</div>
					</div>
					<LoginregisterProfile />
				</div>
			</div>
		</div>
	);
};

export default Groups;
