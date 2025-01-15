import TabGroup from "@/tools/TabGroup";
import Turns from "./Turns";
import Products from "./Products";
import OrdersFilter from "./OrdersFilter";
import OrderItem from "./orderItem/OrderItem";
import { useGetRequestsOrders } from "@/hooks/expertHooks/useRequestsClient";
import LoadingAdmin from "../../LoadingAdmin";

export default function OrdersList() {
    const { ordersData, isLoading } = useGetRequestsOrders();

    const tabs = [
        { label: "همه موارد", status: "all" },
        { label: "تایید نهایی", status: "4" },
        { label: "در انتظار تایید", status: "0" },
        { label: "تایید اولیه", status: "3" },
        { label: "انجام شده", status: "5" },
        { label: "رد شده", status: "2" },
        { label: "لغو شده", status: "1" },
    ];

    if (isLoading) return <LoadingAdmin />

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8 space-y-6'>
                <div className='w-full flex items-end justify-between '>
                    <div className='text-xl text-slate-800 font-semibold'>سفارشات</div>
                </div>

                <OrdersFilter />

                <TabGroup tabs={[{ label: "محصولات" }, ...tabs]}>
                    <TabGroup.Item>
                        <Products />
                    </TabGroup.Item>
                    {tabs.map((tab, index) => (
                        <TabGroup.Item key={index}>
                            <div className="space-y-5">
                                {ordersData.map((order) => (
                                    tab.status === "all" ?
                                        <OrderItem key={order.id} status={order.status || 0} data={order} />
                                        :
                                        Number(order.status) === Number(tab.status) &&
                                        <OrderItem key={order.id} status={order.status || 0} data={order} />
                                ))}
                            </div>
                        </TabGroup.Item>
                    ))}
                </TabGroup>
            </div>
        </div>
    )
}

