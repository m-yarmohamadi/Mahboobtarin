import OrdersFilter from '@/components/admin/adminProfileSteps/orders/OrdersFilter'
import RequestsUsersItem from '@/components/admin/adminProfileSteps/requestsUsers/requestsUsersItem/RequestsUsersItem';
import ExpertDashboard from '@/components/admin/ExpertDashboard'
import TabGroup from '@/tools/TabGroup';

export default function RequestsUsers() {
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

                    <TabGroup tabs={tabs}>
                        <TabGroup.Item>
                            <div className="space-y-5">
                                <RequestsUsersItem status={0} />
                                <RequestsUsersItem status={1} />
                                <RequestsUsersItem status={2} />
                                <RequestsUsersItem status={3} />
                                <RequestsUsersItem status={4} />
                                <RequestsUsersItem status={5} />
                            </div>
                        </TabGroup.Item>
                    </TabGroup>
                </div>
            </div>
        </ExpertDashboard>
    )
}
