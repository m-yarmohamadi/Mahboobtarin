import Link from "next/link";

export default function MyServices() {


	return (
		<div className='flex flex-col justify-between items-center w-full h-full'>
			<div className='w-full'>
				<div className='w-full flex items-center justify-between mb-7 pb-1 border-b border-b-slate-300'>
					<div className='text-xl text-gray-800 font-semibold'>خدمات قابل ارائه شما</div>
					<Link href="/admin/services/create" className='btn btn--primary !px-5'>
						<span>افزودن خدمت جدید</span>
					</Link>
				</div>

				<div className='lg:col-span-2'>

					{[].length !== 0 && (
						<div className='w-full border border-slate-300 rounded-md mt-3'>
							{service.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0'>
									<div className='flex-1 flex items-center gap-1'>
										<p className='text-sm font-medium w-1/2'>{item.title}</p>{' '}
										<span className=' w-24 text-xs flex justify-between items-center'>
											<span className='text-primary-01 font-bold'>{item.subject} </span>
											<span>تومان</span>
										</span>
									</div>
									<button
										onClick={() => removeService(item)}
										type='button'>
										<HiOutlineTrash className='w-5 h-5 text-red-600' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
