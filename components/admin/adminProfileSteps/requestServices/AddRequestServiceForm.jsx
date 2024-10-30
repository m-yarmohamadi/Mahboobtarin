import MultiSelect from "@/tools/MultiSelect";
import Select from "@/tools/Select";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AddRequestServiceForm() {
    return (
        <div className='w-full flex flex-col items-center gap-10'>
            <div className="w-full flex items-center gap-2 py-4 border-b-2 border-slate-300 dark:border-slate-400">
                <button onClick={() => window.history.back()} className="text-slate-600 btn btn--secondary !p-2">
                    <FaArrowRightLong className="w-5 h-5" />
                </button>
                <div className='flex flex-col justify-center itemscenter gap-1'>
                    <h1 className='text-lg text-slate-800 font-bold'>درخواست خدمت جدید</h1>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Select
                    label='نوع خدمت'
                    options={[{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' }]}
                />
                <Select
                    label='سبک'
                    options={[{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' }]}
                />
                <MultiSelect
                    label={'هدف'}
                    placeholder="هدف"
                    options={[]}
                />
            </div>

            <div className="w-full flex items-center gap-2 mt-10 pt-3 border-t border-slate-300">
                <button type="submit" className="!w-full lg:!w-1/2 !text-base !font-bold btn btn--primary">
                    ثبت
                </button>
            </div>
        </div>
    )
}
