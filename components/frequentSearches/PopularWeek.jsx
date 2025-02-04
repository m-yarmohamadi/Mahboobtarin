import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function PopularWeek({ popularWeek }) {
    return (
        <div>
            <h4 className="font-bold text-slate-800 pb-5 lg:text-xl lg:text-center">
                محبوب‌ترین‌های هفته
            </h4>
            <div className="w-full flex items-center gap-5 overflow-x-auto no-scrollbar lg:hidden">
                {popularWeek.map((item, index) => (
                    <PopularWeekItem key={index} item={item} />
                ))}
            </div>
            <div className="hidden lg:flex flex-col gap-12 lg:bg-white lg:rounded-2xl lg:p-6">
                {popularWeek.map((item, index) => (
                    <PopularWeekItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
}


function PopularWeekItem({ item }) {
    const router = useRouter();

    const handleLinks = (link) => {
        router.push(`/${link}`);
    };

    return (
        <div className="py-4 px-6 rounded-2xl bg-white lg:p-0">
            <div className="flex items-center lg:justify-center">
                {item.metekhases.map((pic) => (
                    <button
                        key={pic.id}
                        onClick={() => handleLinks(pic.unique_url_id)}
                        className="w-16 h-16 lg:w-20 lg:h-20 -ms-2"
                    >
                        <img
                            src={pic.avatar || "/images/user.png"}
                            alt=""
                            className="w-full h-full border-2 border-white object-cover object-center rounded-full"
                        />
                    </button>
                ))}
            </div>
            <div className="w-full flex justify-end lg:justify-center mt-6 lg:mt-3">
                <Link
                    href={`/group/${item.id}`}
                    className="text-xs lg:text-sm font-bold text-primary-01 btn !p-0 gap-1 whitespace-nowrap"
                >
                    <span>محبوب‌ترین های</span>
                    &nbsp;
                    {item.name}
                    &nbsp;                    <span>هفته</span>

                    <FaChevronLeft />
                </Link>
            </div>
        </div>
    )
}