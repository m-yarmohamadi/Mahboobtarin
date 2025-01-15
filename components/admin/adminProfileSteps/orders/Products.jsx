import { useGetShopOrders } from "@/hooks/expertHooks/useRequestsClient";
import { getMultiProducts } from "@/services/cartService";
import numberWithCommas from "@/utils/numberWithCommas";
import { toPersianDateLong } from "@/utils/toPersianDate";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Products() {
    const { shopOrders, isLoading } = useGetShopOrders();

    if (isLoading) return null

    return (
        <div className="w-full flex flex-col gap-6">
            {shopOrders.map((item) => (
                <OrderProductItem key={item.id} data={item} />
            ))}
        </div>
    )
}

function OrderProductItem({ data, status = "1" }) {
    const [products, setProducts] = useState([]);

    const statusType = {
        1: { className: "bg-red-500/10 text-red-500", label: "لغو شده توسط کاربر" },
        2: { className: "bg-red-500 text-[#fff]", label: "رد شده توسط عرضه کننده" },
        3: { className: "bg-green-600/30 text-green-600", label: "تایید اولیه" },
        4: { className: "bg-primary-01 text-[#fff]", label: "تایید نهایی" },
        5: { className: "bg-gray-800 text-[#fff]", label: "انجام شده" },
    }

    const toPersianLabelSendmethod = (key) => {
        switch (key) {
            case "motor":
                return "موتور";
            case "adi":
                return "عادی";
            case "pishtaz":
                return "پیشتاز";
            case "express":
                return "اکسپرس";

            default:
                break;
        }
    };
    console.log(products);

    useEffect(() => {
        async function fetchProductsHandler() {

            try {
                const { data: productsData } = await getMultiProducts({ products: data.products.split(",") });
                setProducts(productsData);
            } catch (error) {
                setProducts([]);
            }
        }

        fetchProductsHandler();
    }, [])

    return (
        <div className="w-full p-6 rounded-xl border border-slate-300 bg-slate-200">
            <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-between pb-3">
                <h3 className="text-sm font-medium text-slate-800">
                    شماره سفارش: {data.order_id}
                </h3>
                <div className="flex items-center gap-5 ">
                    <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                        جزئیات سفارش
                    </button>
                    <button className="flex items-center gap-1 text-sm font-medium text-error">
                        <FaRegTrashAlt className="w-4 h-4" />
                        لغو سفارش
                    </button>
                </div>
            </div>
            <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="text-sm text-slate-500">
                    {toPersianDateLong(data.created_at)}
                </div>
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
                <span className="text-slate-800 font-semibold">
                    آدرس
                </span>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-b-slate-300 pb-4">
                <div className="text-sm text-slate-500">
                    فروشنده:
                    {data.user.name} {data.user.lastname}
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                <div className="text-sm text-slate-500">
                    @{data.user.unique_url_id}
                </div>
            </div>


            <div className="py-4 flex items-center flex-wrap gap-4">
                {products.map((product) => (
                    <div key={product.id} className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300">
                        <img src={product?.photos[0]?.path} alt={product.title} className="w-full h-full object-contain object-center" />
                    </div>
                ))}
            </div>

            <div className="w-full flex items-center gap-4">
                <div className="text-sm font-bold text-slate-800">
                    وضعیت
                </div>
                <div className={`${statusType[status].className} rounded-xl flex-1 text-sm text-center font-semibold p-3`}>
                    {statusType[status].label}
                </div>
            </div>
        </div>
    )
}
