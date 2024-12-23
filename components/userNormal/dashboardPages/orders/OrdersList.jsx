import TabGroup from "@/tools/TabGroup";
import Turns from "./Turns";
import Products from "./Products";
import OrdersFilter from "@/components/admin/adminProfileSteps/orders/OrdersFilter";
import OrderItem from "@/components/admin/adminProfileSteps/orders/orderItem/OrderItem";

export default function OrdersList() {
    const tabs = [
        { label: "همه موارد" },
        { label: "تایید نهایی" },
        { label: "در انتظار تایید" },
        { label: "تایید اولیه" },
        { label: "انجام شده" },
        { label: "رد شده" },
        { label: "لغو شده" },
    ];

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8 space-y-5'>
                <div className='w-full flex items-end justify-between'>
                    <div className='text-xl text-slate-800 font-semibold'>سفارشات</div>
                </div>

                <OrdersFilter />

                <TabGroup tabs={tabs}>
                    <TabGroup.Item>
                        <div className="space-y-5">
                            <OrderItem status={0} />
                            <OrderItem status={1} />
                            <OrderItem status={2} />
                            <OrderItem status={3} />
                            <OrderItem status={4} />
                            <OrderItem status={5} />
                        </div>
                    </TabGroup.Item>
                </TabGroup>
            </div>
        </div>
    )
}

