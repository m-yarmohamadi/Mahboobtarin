import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

const Followers = [
    {
      id: 1,
      picUrl: "/images/FaribaEghdami.webp",
      name: "علی رسولی",
      idCloud: "@Ali_Rasouli",
      position:
        "معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان",
      ablution: 0,
    },
    {
      id: 2,
      picUrl: "/images/FaribaEghdami.webp",
      name: "مهدی انجدینی",
      idCloud: "@Anjidani",
      position:
        "معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان",
      ablution: 2,
    },
    {
      id: 3,
      picUrl: "/images/FaribaEghdami.webp",
      name: "محمدرضا پاکدل",
      idCloud: "@m_pakdel",
      position: "عضو هیأت مدیره شرکت ملی پست",
      ablution: 1,
    },
    {
      id: 4,
      picUrl: "/images/FaribaEghdami.webp",
      name: "امیر جهانی",
      idCloud: "@Amir_Jahani",
      position:
        "معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان",
      ablution: 2,
    },
    {
      id: 5,
      picUrl: "/images/FaribaEghdami.webp",
      name: "خبرگزاری حوزه (حوزه علمیه قم)",
      idCloud: "@Hoze",
      position:
        "معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان",
      ablution: 0,
    },
  ];
  
export default function OtherExpert() {
    return (
        <div className="w-full lg:pt-8">
            <div className="w-full p-6 bg-slate-200 dark:bg-slate-300 rounded-xl">
                <div className="w-full flex justify-between flex-col sm:flex-row items-center gap-2 text-md font-bold">
                    <span className="truncate text-textDefault">
                        افرادی برای دنبال کردن
                    </span>
                    <div className="text-white text-xl rounded-full flex justify-between items-center w-24 bg-slate-300  h-fit">
                        <div className="w-full h-full bg-blue-800 px-4 py-1 rounded-full">
                            <AiOutlineCheckCircle />
                        </div>
                        <div className="w-full h-full p-1  rounded-full text-slate-500">
                            <IoPerson />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    {Followers.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="w-full min-h-full justify-between flex flex-col gap-3 px-2 py-8"
                            >
                                <div className="w-full flex flex-col items-center sm:flex-row lg:flex-col xl:flex-row gap-2 justify-between">
                                    <div className="">
                                        <div className="w-12 h-12">
                                            <img
                                                className="w-full h-full object-cover object-center rounded-[18px]"
                                                src={item.picUrl}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center justify-between gap-2">
                                        <div className="flex-1 flex flex-col gap-1 justify-center items-start">
                                            <span className="flex justify-start items-center gap-1">
                                                <h3 className="text-sm font-bold text-slate-800">
                                                    {item.name}
                                                </h3>
                                                {item.ablution === 1 ? (
                                                    <span className="font-bold text-green-600 text-sm">
                                                        <AiOutlineCheckCircle />
                                                    </span>
                                                ) : item.ablution === 2 ? (
                                                    <span className="font-bold text-blue-600 text-xs">
                                                        <AiOutlineCheckCircle />
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                            <span className="text-slate-500 text-xs">
                                                {item.idCloud}
                                            </span>
                                        </div>
                                        <button
                                            className="w-auto text-xs bg-primary-01 p-2 rounded-md text-white font-bold hover:bg-opacity-95"
                                            type=""
                                        >
                                            مشاهده پروفایل
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center sm:items-start justify-between gap-2 text-xs">
                                    <div>
                                        <span className="w-full text-xs text-slate-800 leading-5 font-medium">
                                            {item.position}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full">
                    <button
                        className=" flex justify-center items-center  px-4 py-2 rounded-md text-primary-01 "
                        type=""
                    >
                        بیشتر
                    </button>
                </div>
            </div>
        </div>

    )
}
