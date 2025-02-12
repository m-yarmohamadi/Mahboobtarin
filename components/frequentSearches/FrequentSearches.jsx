import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FrequentSearches({ topSearch }) {

    return (
        <div>
            <h4 className="font-bold text-slate-800 pb-5 lg:text-xl lg:text-center">
                جستجو‌های پر تکرار
            </h4>
            <div className="w-full flex items-center gap-5 overflow-x-auto no-scrollbar lg:hidden">
                {topSearch.map((item, index) => (
                    <FrequentSearchesItem key={index} item={item} />
                ))}
            </div>
            <div className="w-full hidden lg:grid grid-cols-1 xl:grid-cols-2 xl:gap-x-10 lg:bg-white lg:rounded-2xl lg:p-6">
                {topSearch.map((item, index) => (
                    <FrequentSearchesItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
}


function FrequentSearchesItem({ item }) {
    const router = useRouter();

    const handleLinks = (link) => {
        router.push(`/${link}`);
    };

    return (
        <div className="min-w-[272px] lg:min-w-0 p-4 lg:py-10 lg:px-0 rounded-2xl bg-white flex items-start gap-4 lg:gap-6 lg:border-b lg:border-b-primary-02 lg:rounded-none">
            <div>
                <Link href={`/group/${item.id}`} className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] block">
                    <img
                        src={item.picture || ""}
                        alt={item.title}
                        className="w-full h-full object-cover object-center rounded-2xl"
                    />
                </Link>
            </div>
            <div>
                <Link href={`/group/${item.id}`} className="block">
                    <h2 className="text-sm lg:text-base font-bold text-slate-800 whitespace-nowrap">
                        {item.title}
                    </h2>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: item.meta_desc }} className="mt-2 text-xs  text-slate-600 font-medium text-justify line-clamp-2">
                </div>
                <div className="flex items-center mt-5">
                    {item.metekhases.slice(0, 3).map((pic, index) => (
                        <button
                            onClick={() => handleLinks(pic.unique_url_id)}
                            key={index}
                            className="w-8 h-8 lg:w-10 lg:h-10 -ms-2"
                        >
                            <img
                                src={pic.avatar || "/images/user.png"}
                                alt=""
                                className="w-full h-full object-cover object-center rounded-full border-2 shadow-xl dark:shadow-darkLg border-white"
                            />
                        </button>
                    ))}
                    {item.metekhases.length - 3 > 0 &&
                        <div className="w-8 h-8 lg:w-10 lg:h-10 -ms-2 bg-white text-primary-01 shadow-lg dark:shadow-darkLg text-xs font-semibold rounded-full flex items-center justify-center">
                            {item.metekhases.length - 3} +
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}