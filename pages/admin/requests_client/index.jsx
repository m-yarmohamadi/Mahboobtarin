import OrdersFilter from '@/components/admin/adminProfileSteps/orders/OrdersFilter'
import ProductsUser from '@/components/admin/adminProfileSteps/requestsUsers/ProductsUsers';
import RequestsUsersItem from '@/components/admin/adminProfileSteps/requestsUsers/requestsUsersItem/RequestsUsersItem';
import ExpertDashboard from '@/components/admin/ExpertDashboard'
import LoadingAdmin from '@/components/admin/LoadingAdmin';
import { useGetRequestsClient } from '@/hooks/expertHooks/useRequestsClient';
import { useGetProvinces } from '@/hooks/useCity';
import TabGroup from '@/tools/TabGroup';

export default function RequestsClient() {
    const { requestsClient, isLoading } = useGetRequestsClient();
    const { transformProvinces, isLoading: isGetProvinces } = useGetProvinces();

    const tabs = [
        { label: "همه موارد" },
        { label: "مشاوره" },
        { label: "آموزش" },
        { label: "تبلیغات" },
        { label: "دعوتنامه" },
        { label: "همکاری" },
        { label: "غرفه" },
        { label: "حامی" },
        { label: "مشارکت" },
    ];

    return (
        <ExpertDashboard>
            <div className='flex flex-col justify-between items-center w-full h-full'>
                <div className='w-full pb-8 space-y-6'>
                    <div className='w-full flex items-end justify-between'>
                        <div className='text-xl text-slate-800 font-semibold'>درخواست ها</div>
                    </div>

                    <OrdersFilter />

                    {
                        !isLoading && !isGetProvinces ?
                            <TabGroup tabs={tabs}>
                                {tabs.map((tab, index) => (
                                    <TabGroup.Item key={index}>
                                        <div className="space-y-5">

                                            {
                                                tab.label === "غرفه" ?
                                                    <ProductsUser
                                                        shopData={requestsClient?.product_orders}
                                                    />
                                                    :
                                                    requestsClient?.orders?.map((item) => (
                                                        tab.label === "همه موارد" ?
                                                            <RequestsUsersItem
                                                                key={item.id}
                                                                data={item}
                                                                status={item.status || 0}
                                                                provinces={transformProvinces}
                                                            />
                                                            :
                                                            item.service.length > 0 && item.service[0]?.type.includes(tab.label) &&
                                                            <RequestsUsersItem
                                                                key={item.id}
                                                                data={item}
                                                                status={item.status || 0}
                                                                provinces={transformProvinces}
                                                            />
                                                    ))

                                            }
                                        </div>
                                    </TabGroup.Item>
                                ))}
                            </TabGroup>
                            :
                            <LoadingAdmin />
                    }
                </div>
            </div>
        </ExpertDashboard>
    )
}
