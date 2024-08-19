import CheckBoxInput from "@/components/CheckBoxInput";
import TextArea from "@/tools/TextArea";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineClock } from "react-icons/hi2";

export default function VisitDetails() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 mb-4">
                <div className="text-primary-01 font-medium">
                    نوع ویزیت
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <CiCalendar className="w-5 h-5 text-gray-500" />
                        نوبت: 1403/5/29
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <HiOutlineClock className="w-5 h-5 text-gray-500" />
                        ساعت: 22:00
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-primary-01 font-medium mb-2">
                    علت مراجعه
                </div>
                <ul className="w-full flex items-center gap-10 mb-6">
                    <div>
                        <CheckBoxInput label="شرح 1" name="1" />
                    </div>
                    <div>
                        <CheckBoxInput label="شرح 2" name="2" />
                    </div>
                </ul>
                <TextArea
                    label="شرح مراجعه"
                />
            </div>
        </div>
    )
}
