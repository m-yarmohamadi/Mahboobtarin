import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import OrderItemDetails from "../../orders/orderItem/OrderItemDetails";
import OrderItemStatus from "../../orders/orderItem/OrderItemStatus";
import calculateAge from "@/utils/calculateAge";
import { useGetProvinces } from "@/hooks/useCity";
import { useMutation } from "@tanstack/react-query";
import { changeStatusRequestsClientApi } from "@/services/expertApi/requestsClientService";
import toast from "react-hot-toast";


export default function RequestsUsersItem({ status, data, provinces }) {
    const getProvinceLabel = provinces.filter((p) => p.value === Number(data.user?.province_id))[0]?.label;
    const { mutateAsync: mutateChangeStatus, isPending } = useMutation({ mutationFn: changeStatusRequestsClientApi });


    const changeStatusHandler = async (statusNum) => {
        try {
            const { data: statusData } = await mutateChangeStatus({ orderid: data.order_id, status: statusNum.toString() });
            console.log(statusData);


        } catch (error) {
            console.log(error);

            if (error?.response?.status === 401) {
                toast.error("ابتدا وارد حساب کاربری خود شوید");
                window.location.href = "/auth";
                return;
            }
        }
    }

    return (
        <div className="w-full bg-white rounded-xl p-4">
            {/* user and order details */}
            <div className="w-full flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-12 h-12">
                            <img
                                src={data.user.avatar.length > 0 ? data.user.avatar[0].path : "/images/user.png"}
                                alt={`${data.user.name} ${data.user.lastname}`}
                                className="w-full h-full object-cover object-center rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 truncate">
                            {data.user.name} {data.user.lastname}
                        </span>
                        <span className="text-xs text-slate-600">
                            {data.user.gender === "man" ? "مرد" : "زن"} | {calculateAge(data?.user?.birthday)} | {getProvinceLabel}
                        </span>
                    </div>
                </div>
                <OrderItemDetails service={data.service[0]} turnData={data.json_data} />

                <div className="flex md:flex-col items-center md:items-start md:justify-center gap-5 md:gap-2">
                    <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                        <MdOutlineChat className="w-5 h-5" />
                        ارسال پیام
                    </button>
                    <button className="flex items-center gap-1 text-sm font-medium text-error">
                        <FaRegTrashAlt className="w-4 h-4" />
                        لغو سفارش
                    </button>
                </div>
            </div>

            {/* status */}
            <OrderItemStatus status={status} isExpert={true} />

            {/* options */}
            <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 mt-4">
                <button className="btn btn--outline !text-primary-01 !border-primary-01">
                    مشاهده جزئیات
                </button>
                {status === "0" &&
                    <button onClick={() => changeStatusHandler(3)} className="btn btn--primary !bg-lime-600">
                        درصورت تایید کلیک کنید
                    </button>
                }
                {status === "3" &&
                    <button className="btn btn--primary !opacity-80">
                        در انتظار تایید توسط کاربر متقاضی
                    </button>
                }
                {status !== "0" && status !== "3" &&
                    <button className="btn btn--outline !text-primary-01 !border-primary-01">
                        ثبت عملیات توسط شما
                    </button>
                }
            </div>
        </div>
    )
}
