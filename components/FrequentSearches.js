import React from "react";
import PN from "persian-number";
import { FaChevronLeft } from "react-icons/fa";
import useMainPage from "@/hooks/useMainPage";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FrequentSearches = () => {
  const { top_search, popular_week, isLoading } = useMainPage();
  const router = useRouter();

  const handleLinks = (link) => {
    router.push(`/${link}`);
  };

  if (isLoading) return null;

  return (
    <div className=" md:container px-0 pb-16">
      <div className="w-full lg:h-[45rem] flex flex-col lg:flex-row gap-8 lg:gap-5">
        <div className="lg:w-[65%] flex flex-col overflow-hidden">
          <h4 className="text-slate-800 font-bold text-lg md:text-xl lg:text-2xl text-center mb-3">
            جستجو‌های پر تکرار
          </h4>
          <div className="w-full bg-white md:rounded-lg overflow-hidden scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin flex-1">
            <div className="w-full flex items-center gap-20 md:grid lg:grid-cols-1 xl:grid-cols-2 xl:gap-x-5 overflow-x-auto lg:overflow-hidden scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin p-8">
              {top_search.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex gap-4 md:border-b border-b-primary-02 md:pb-3"
                >
                  <div>
                    <div className="w-28 h-32 xl:w-24 xl:h-28 flex items-center justify-center border border-primary-02 rounded-lg">
                      <img
                        src={item.picture || ""}
                        alt=""
                        className="w-full h-full border border-primary-01 rounded-s-lg border-double object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-slate-800 font-bold mb-2 whitespace-nowrap">
                      {item.title}
                    </p>
                    <span
                      className="text-sm text-slate-700 whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></span>

                    <div className="flex items-center mt-6">
                      {item.metekhases.slice(0, 3).map((pic, index) => (
                        <button
                          onClick={() => handleLinks(pic.unique_url_id)}
                          key={index}
                          className="w-10 h-10 -ms-2"
                        >
                          <img
                            src={pic.avatar || "/images/user.png"}
                            alt=""
                            className="w-full h-full object-cover object-center rounded-full border border-white"
                          />
                        </button>
                      ))}
                      <div className="w-10 h-10 -ms-2 bg-white shadow-lg dark:shadow-darkLg text-slate-800 text-sm font-semibold rounded-full flex items-center justify-center">
                        {item.metekhases.length - 3 || 0} +
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-slate-200 p-1 flex justify-end">
              <button className="btn gap-2 text-sm text-slate-800 font-bold">
                همه تخصص ها
                <FaChevronLeft />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] flex flex-col overflow-auto">
          <h4 className="text-slate-800 font-bold text-lg md:text-xl lg:text-2xl text-center mb-3">
            محبوب‌ترین‌های هفته
          </h4>
          <div className="bg-white shadow-lg dark:shadow-darkLg md:rounded-lg overflow-auto flex-1">
            <div className="lg:max-h-full flex md:grid grid-cols-2 lg:grid-cols-1 overflow-x-auto lg:overflow-y-auto scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin gap-12 p-8">
              {popular_week.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 md:flex flex-col justify-center"
                >
                  <div className="flex items-center md:justify-center">
                    {item.metekhases.map((pic) => (
                      <button
                        key={pic.id}
                        onClick={() => handleLinks(pic.unique_url_id)}
                        className="w-12 h-12 md:w-20 md:h-20 -ms-2"
                      >
                        <img
                          src={pic.avatar || "/images/user.png"}
                          alt=""
                          className="w-full h-full border border-white object-cover object-center rounded-full"
                        />
                      </button>
                    ))}
                  </div>
                  <Link
                    href={`/group/${item.id}`}
                    className="text-sm font-bold text-primary-01 btn !px-0 gap-2 whitespace-nowrap"
                  >
                    {item.name}
                    <FaChevronLeft />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentSearches;
