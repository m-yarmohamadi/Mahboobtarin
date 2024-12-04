import { useGetProvinces } from "@/hooks/useCity";
import moment from "moment";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import 'moment/locale/fa';

export default function ReqeustOptions({ request }) {
    const { created_at, province } = request;
    const { provinces, isLoading } = useGetProvinces();
    const provinceLabel = !isLoading && provinces.filter((p) => Number(p.id) === Number(province))[0]?.name;
    moment.locale("fa");
    
    return (
        <div className="w-full flex items-center justify-between lg:flex-col gap-4 lg:gap-7">
            <div className="lg:w-full text-xs lg:text-sm lg:text-center text-slate-700">
                {moment(created_at).fromNow()} در {provinceLabel}
            </div>
            <div className="lg:w-full flex items-center flex-1 justify-around">
                <button>
                    <FaRegBookmark className="w-5 h-5 lg:w-6 lg:h-6 text-primary-01" />
                </button>
                <button>
                    <FiShare2 className="w-5 h-5 lg:w-6 lg:h-6 text-primary-01" />
                </button>
            </div>
            <div className="lg:w-full">
                <button className="btn btn--primary w-full">
                    تایید فراخوان
                </button>
            </div>
        </div>
    )
}
