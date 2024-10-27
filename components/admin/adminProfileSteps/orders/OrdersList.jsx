import TabGroup from "@/tools/TabGroup";
import Turns from "./Turns";
import Products from "./Products";

export default function OrdersList() {
    const tabs = [
        { label: "همه موارد" },
        { label: "مشاوره" },
        { label: "اموزش" },
        { label: "تبلیغات" },
        { label: "دعوتنامه" },
        { label: "همکاری" },
        { label: "غرفه" },
        { label: "حامی" },
        { label: "مشارکت" },
    ];

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex items-end justify-between mb-7 pb-4 '>
                    <div className='text-xl text-slate-800 font-semibold'>سفارشات</div>
                </div>

                <TabGroup tabs={tabs}>
                    {/* <TabGroup.Item>
                        <Turns />
                    </TabGroup.Item>
                    <TabGroup.Item>
                        <Products />
                    </TabGroup.Item> */}
                </TabGroup>
            </div>
        </div>
    )
}

