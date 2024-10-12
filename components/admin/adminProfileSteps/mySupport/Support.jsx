import Modal from '@/components/Modal';
import React, { useState } from 'react';
import { FaDotCircle } from 'react-icons/fa';

const Support = () => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className='w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4'>
				<h1 className='text-xl text-gray-800 font-semibold'>پشتیبانی</h1>
				<button
					button
					onClick={() => setOpen(true)}
					className='p-2 bg-primary-01 rounded-md text-primary-02  hover:shadow-md'>
					ثبت تیکت
				</button>
			</div>
			<div className='w-full'>
				<div className='w-full flex justify-between items-center px-2 py-8 '>
					<div className='w-full flex justify-center items-center font-extrabold'>تیکتهای من</div>
					<div className='w-full flex justify-center items-center gap-4 text-primary-02'>
						<button className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-green-900 hover:shadow-md w-32'>بسته شده</button>
						<button className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-yellow-400 hover:shadow-md w-32'>پاسخ داده شده</button>
						<button className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-yellow-900 hover:shadow-md w-32'>در انتظار پاسخ</button>
						<button className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-red-900 hover:shadow-md w-32'>باز</button>
					</div>
				</div>

				<table className='w-full table-fixed items-center text-center justify-center border border-white bg-white p-2 rounded-md'>
					<thead className='border-b-2 border-primary-01 text-primary-01'>
						<tr>
							<th className='w-8'></th>
							<th>موضوع</th>
							<th>تاریخ ایجاد</th>
							<th>اخرین فعالیت</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<FaDotCircle className='w-7 text-green-900' />
							</td>
							<td>موضوع شماره 1</td>
							<td>1403/07/01</td>
							<td>1403/07/17</td>
						</tr>
						<tr>
							<td>
								<FaDotCircle className='w-7 text-red-900' />
							</td>
							<td>موضوع شماره 2</td>
							<td>1403/07/02</td>
							<td>1403/07/18</td>
						</tr>
						<tr>
							<td>
								<FaDotCircle className='w-7 text-green-900' />
							</td>
							<td>موضوع شماره 3</td>
							<td>1403/07/03</td>
							<td>1403/07/19</td>
						</tr>
					</tbody>
				</table>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					title='تیکت جدید'>
					<form>
						<div className='w-full px-3 mb-6 md:mb-0'>
							<label for=''>موضوع تیکت</label>
							<input
								type='text'
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							/>
						</div>
						<div className='w-full px-3 mb-6 md:mb-0'>
							<label for=''>شرح تیکت</label>
							<textarea
								type='text'
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							/>
						</div>
						<div className='w-full flex justify-end items-center'>
							<button className='p-2 bg-primary-01 text-white rounded-md'>ثبت تیکت</button>
						</div>
					</form>
				</Modal>
			</div>
		</div>
	);
};

export default Support;
