import Modal from '@/components/Modal';
import { useGetTicket } from '@/hooks/expertHooks/useSupport';
import { addTicket } from '@/services/expertApi/supportService';
import Loading from '@/tools/Loading';
import { toPersianDateShort } from '@/utils/toPersianDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaDotCircle } from 'react-icons/fa';
import LoadingAdmin from '../../LoadingAdmin';

const Support = () => {
	const [open, setOpen] = useState(false);
	const { tickets, isLoading } = useGetTicket();
	const [previewTicket, setPreviewTicket] = useState(null);
	const [filter, setFilter] = useState();

	let filteredData = !isLoading && tickets?.data;

	if (filter === 0) {
		filteredData = tickets?.data?.filter((t) => t.status === "0");
	}
	if (filter === 1) {
		filteredData = tickets?.data?.filter((t) => t.status === "1");
	}
	if (filter === 2) {
		filteredData = tickets?.data?.filter((t) => t.status === "2");
	}
	if (filter === 3) {
		filteredData = tickets?.data?.filter((t) => t.status === "3");
	}

	if (isLoading) return <LoadingAdmin />

	return (
		<div>
			<div className='w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4'>
				<h1 className='text-xl text-slate-800 font-semibold'>پشتیبانی</h1>
				<button
					onClick={() => setOpen(true)}
					className='btn btn--primary'>
					ثبت تیکت
				</button>
			</div>
			<div className='w-full'>
				<div className='w-full flex justify-between items-center px-2 py-8 '>
					<div className='w-full flex justify-center items-center font-extrabold text-textDefault'>تیکتهای من</div>
					<div className='w-full flex justify-center items-center gap-4 text-primary-02'>
						<button onClick={() => setFilter(1)} className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-green-900 text-[#fff] hover:shadow-md dark:shadow-darkMd w-32'>بسته شده</button>
						<button onClick={() => setFilter(3)} className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-yellow-400 text-[#fff] hover:shadow-md dark:shadow-darkMd w-32'>پاسخ داده شده</button>
						<button onClick={() => setFilter(0)} className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-yellow-900 text-[#fff] hover:shadow-md dark:shadow-darkMd w-32'>در انتظار پاسخ</button>
						<button onClick={() => setFilter(2)} className='focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-01 p-2 rounded-md bg-red-900 text-[#fff] hover:shadow-md dark:shadow-darkMd w-32'>باز</button>
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
						{filteredData?.map((ticket) => (
							<React.Fragment key={ticket.id}>
								<tr onClick={() => setPreviewTicket(ticket.id)}>
									<td>
										<FaDotCircle className={`w-7 ${ticket.status === "0" ? "text-red-600" : "text-green-900"}`} />
									</td>
									<td className='text-textDefault'>{ticket.title}</td>
									<td className='text-textDefault'>{toPersianDateShort(ticket.created_at)}</td>
									<td className='text-textDefault'>{toPersianDateShort(ticket.updated_at)}</td>
								</tr>
								<Modal title={`موضوع : ${ticket.title}`} open={previewTicket === ticket.id ? true : false} onClose={() => setPreviewTicket(null)} >
									<PreviewTicket ticket={ticket} onClose={() => setPreviewTicket(null)} />
								</Modal>
							</React.Fragment>
						))}
					</tbody>
				</table>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					title='تیکت جدید'
				>
					<CreateTicketForm onClose={() => setOpen(false)} />
				</Modal>
			</div>
		</div>
	);
};

export default Support;


function CreateTicketForm({ onClose }) {
	const { mutateAsync, isPending } = useMutation({ mutationFn: addTicket });
	const queryClient = useQueryClient();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const submitTicketHandler = async (e) => {
		e.preventDefault();

		if (!title) {
			toast.error("عنوان تیکت را وارد کنید");
			return
		}

		if (!description) {
			toast.error("توضیحات تیکت را وارد کنید");
			return
		}

		if (title && description) {
			try {
				const { data } = await mutateAsync({ title, description });
				if (data) {
					toast.success("تیکت شما ثبت شد");
					queryClient.invalidateQueries({ queryKey: ["get-tickets"] });
					setTitle("");
					setDescription("");
					onClose();
				}

			} catch (error) {
				if (error?.response?.status === 401) {
					window.location.reload();
					return;
				}

				toast.error("خطایی رخ داده است");
			}
		}
	}

	return (
		<form onSubmit={submitTicketHandler}>
			<div className='w-full px-3 mb-6 md:mb-0'>
				<label for='' className="text-textDefault">موضوع تیکت</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='appearance-none block w-full bg-slate-200 text-slate-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				/>
			</div>
			<div className='w-full px-3 mb-6 md:mb-0'>
				<label for='' className="text-textDefault">شرح تیکت</label>
				<textarea
					type='text'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='appearance-none block w-full bg-slate-200 text-slate-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				/>
			</div>
			<div className='w-full flex justify-end items-center'>
				<button type='submit' className='p-2 bg-primary-01 text-white rounded-md'>
					{!isPending ? "ثبت تیکت" : <Loading />}
				</button>
			</div>
		</form>
	)
}

function PreviewTicket({ ticket, onClose }) {

	return (
		<div>
			<p className='text-sm text-slate-800'>
				{ticket?.description}
			</p>
			<div className='text-sm text-slate-800 pt-4 flex items-center gap-2'>
				<FaDotCircle className={`w-7 ${ticket.status === "0" ? "text-red-600" : "text-green-900"}`} />
				وضعیت : {ticket.status === "0" ? "در انتظار پاسخ" : "بسته شد"}
			</div>
			<button onClick={onClose} className='btn btn--outline !w-full mt-4'>
				بستن
			</button>
		</div>
	)
}