import { useGetServices } from "@/hooks/useDashboard";
import { deleteService } from "@/services/expertDashboardService";
import Loading from "@/tools/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function MyServices() {
	const { servicesData, isLoadingServices } = useGetServices();
	const { isPending, mutateAsync: mutateDeleteService } = useMutation({ mutationFn: deleteService });
	const queryClient = useQueryClient();

	const deleteServiceHandler = async (id) => {
		try {
			const { data } = await mutateDeleteService({ id });
			
			if (data) {
				toast.success("خدمت مورد نظر حذف شد");
				queryClient.invalidateQueries({ queryKey: ['get-services'] });
			}

		} catch (error) {
			if (error?.response?.status === 401) {
				toast.error("لطفا وارد حساب کاربری خود شوید");
				window.location.reload();
			} else {
				toast.error("خطایی رخ داده است");
			}
		}
	}

	if (isLoadingServices) return (
		<div className='w-full h-full flex items-center justify-center'>
			<Loading customeColor="#0693a4" />
		</div>
	)

	return (
		<div className='flex flex-col justify-between items-center w-full h-full'>
			<div className='w-full'>
				<div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300'>
					<div className='text-xl text-gray-800 font-semibold'>خدمات قابل ارائه شما</div>
					<Link href="/admin/services/create" className='btn btn--primary !px-5'>
						<span>افزودن خدمت جدید</span>
					</Link>
				</div>

				<div className='lg:col-span-2'>

					{servicesData.length !== 0 && (
						<div className='w-full border border-slate-300 rounded-md mt-3'>
							{servicesData.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0'
								>
									<div className='flex items-center gap-2'>
										<p className='text-sm font-medium'>{item.type}</p>
										<span>
											-
										</span>
										<span className=' text-xs flex justify-between items-center'>
											{
												item.price_type === "custom" ?
													<>
														<span className='text-primary-01 font-bold inline-block ml-1'>
															{item.price}
														</span>
														<span>تومان</span>
													</>
													:
													<span className='text-primary-01 font-bold'>
														{item.price_type === "free" ? "رایگان" : "خیریه"}
													</span>
											}

										</span>
									</div>
									<div className="flex items-center gap-2">
										<Link href={`/admin/services/view/${item.id}`}>
											<MdOutlineRemoveRedEye className='w-5 h-5 text-primary-01' />
										</Link>
										<button
											onClick={() => deleteServiceHandler(item.id)}
											type='button'>
											<HiOutlineTrash className='w-5 h-5 text-red-600' />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
