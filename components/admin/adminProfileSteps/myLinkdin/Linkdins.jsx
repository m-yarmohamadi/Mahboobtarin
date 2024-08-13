import useGetExpertiseUser from '@/hooks/useExpertiseUser';
import useProfile from '@/hooks/useProfile';
import Input from '@/tools/Input';
import Loading from '@/tools/Loading';
import Select from '@/tools/Select';
import { toPersianDateLong } from '@/utils/toPersianDate';
import { Textarea } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import { IoMdAdd } from 'react-icons/io';

export default function Linkdins({ formik, loading, link_dooni }) {
	const removeLinkdin = (value) => {
		// formik.setFieldValue(
		// 	'linkdin',
		// 	linkdin.filter((i) => linkdin.indexOf(i) !== linkdin.indexOf(value))
		// );
	};


	return (
		<div className='lg:col-span-2'>
			<div className='flex items-end gap-4'>
				<div className='flex-1 flex  gap-4'>
					<div className='flex flex-col w-full'>
						<Input
							label='تیتر خبر'
							formik={formik}
							name="title"
						/>
						<Input
							label='منبع خبر'
							formik={formik}
							name="source"
						/>
						<Input
							label='لینک خبر'
							formik={formik}
							name="link"
						/>
						<button
							type='submit'
							className='btn btn--outline !p-2 !rounded-md mb-1'>
							{loading ?
								<Loading customeColor="#0693a4" />
								:
								<>
									<IoMdAdd className='w-6 h-6' /> درج خبر
								</>
							}
						</button>
					</div>
				</div>
			</div>
			{link_dooni.length !== 0 && (
				<div className='w-full border border-slate-300 rounded-md mt-3'>
					{link_dooni.map((item, index) => (
						<div
							key={index}
							className='flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0'>
							<div className='flex-1 flex items-center gap-1'>
								<Link href={item.link} rel='nofollow' target='_blank' className='text-sm font-medium border-l hover:text-blue-600 hover:underline border-slate-400 pl-1'>
									{item.title}
								</Link>
								<span className='text-primary-01 font-bold text-xs'>
									{item.source}
								</span>
							</div>
							<div className='flex items-center gap-4'>
								<span className='text-primary-01 font-bold text-xs'>{toPersianDateLong(item.created_at)} </span>
								<button
									onClick={() => removeLinkdin(item)}
									type='button'>
									<HiOutlineTrash className='w-5 h-5 text-red-600' />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
