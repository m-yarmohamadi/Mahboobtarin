import Modal from '@/components/Modal';
import { getMultiProducts } from '@/services/cartService';
import numberWithCommas from '@/utils/numberWithCommas';
import { toPersianDateLong } from '@/utils/toPersianDate';
import { useEffect, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ChangeShopOrderStatus from './ChangeShopOrderStatus';

export default function ProductsUser({ shopData }) {
	return (
		<div className="w-full flex flex-col gap-6">
			{shopData.map((item) => (
				<ProductUserItem key={item.id} data={item} status={item.status} />
			))}
		</div>
	);
}

function ProductUserItem({ data, status = '1' }) {
	const [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);

	const statusType = {
		// 1: { className: "bg-red-500/10 text-red-500", label: "در حال پردازش" },
		0: { className: 'bg-red-500 text-[#fff]', label: 'در حال پردازش' },
		1: { className: 'bg-green-600/30 text-green-600', label: 'بررسی شده' },
		2: { className: 'bg-primary-01 text-[#fff]', label: 'ارسال به پست' },
		3: { className: 'bg-gray-800 text-[#fff]', label: 'دریافت توسط مشتری' },
	};

	const toPersianLabelSendmethod = (key) => {
		switch (key) {
			case 'motor':
				return 'موتور';
			case 'adi':
				return 'عادی';
			case 'pishtaz':
				return 'پیشتاز';
			case 'express':
				return 'اکسپرس';

			default:
				break;
		}
	};

	useEffect(() => {
		async function fetchProductsHandler() {
			try {
				const { data: productsData } = await getMultiProducts({
					products: data.products.split(','),
				});
				setProducts(productsData);
			} catch (error) {
				setProducts([]);
			}
		}

		fetchProductsHandler();
	}, []);

	return (
		<div className="w-full p-6 rounded-xl border border-slate-300 bg-slate-200">
			<div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-between pb-3">
				<h3 className="text-sm font-medium text-slate-800">شماره سفارش: {data.order_id}</h3>
				<div className="flex items-center gap-5 ">
					{/* <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                        جزئیات سفارش
                    </button> */}
				</div>
			</div>
			<div className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
				<div className="text-sm text-slate-500">{toPersianDateLong(data.created_at)}</div>
				<div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
				<div className="text-sm text-slate-500 flex items-center gap-1">
					مبلغ
					<span className="text-slate-800 font-semibold">
						{numberWithCommas(Number(data.totalprice).toFixed(0))} تومان
					</span>
				</div>
				<div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
				<div className="text-sm text-slate-500 flex items-center gap-1">
					ارسال
					<span className="text-slate-800 font-semibold">
						{toPersianLabelSendmethod(data.sendmethod)}
					</span>
				</div>
			</div>
			<div className="text-xs text-slate-500 flex items-center gap-1 border-b border-b-slate-300 pb-4">
				<HiOutlineLocationMarker className="w-4 h-4" />
				<span className="text-slate-800 font-semibold">آدرس</span>
			</div>

			<div className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-b-slate-300 pb-4">
				<div className="text-sm text-slate-500">
					خریدار:
					{data?.user?.name} {data?.user?.lastname}
				</div>
			</div>

			<div className="py-4 flex items-center flex-wrap gap-4">
				{products.map((product) => (
					<div
						key={product.id}
						className="w-24 h-auto rounded-xl overflow-hidden border border-slate-300"
					>
						<div className="w-24 h-24 border-b border-slate-300 p-2">
							<img
								src={product?.photos[0]?.path}
								alt={product.title}
								className="w-full h-full object-contain object-center"
							/>
						</div>
						<div className="py-2 text-sm text-slate-800 flex justify-center">
							تعداد:1
						</div>
					</div>
				))}
			</div>

			<div className="w-full flex items-center gap-4">
				<div className="text-sm font-bold text-slate-800">وضعیت</div>
				<div
					className={`${statusType[status].className} rounded-xl flex-1 text-sm text-center font-semibold p-3`}
				>
					{statusType[status].label}
				</div>
			</div>

			<div className="w-full flex flex-col sm:flex-row gap-2 mt-4">
				<button
					onClick={() => setOpen(true)}
					className="!w-full btn btn--outline !text-primary-01 !border-primary-01"
				>
					تغییر وضعیت سفارش
				</button>
			</div>
			<Modal open={open} onClose={() => setOpen(false)} title="تغییر وضعیت سفارش محصول">
				<ChangeShopOrderStatus
					onClose={() => setOpen(false)}
					lastSelected={status}
					orderid={data.order_id}
				/>
			</Modal>
		</div>
	);
}
