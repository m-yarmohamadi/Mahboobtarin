import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ExpertServicesList from "./detailProfileComponents/ExpertServicesList";
import OtherExpert from "./detailProfileComponents/OtherExpert";
import { getTopSearchs } from "@/services/mainPageService";

const LeftProfile = ({ user }) => {
  const [topSearch, setTopSearch] = useState([]);

  useEffect(() => {
    async function fetchTopSearch() {
      try {
        const res = await getTopSearchs();
        setTopSearch(res);
      } catch (error) {
        setTopSearch([]);
      }
    }

    fetchTopSearch();
  }, []);

  return (
    <div className="w-full  ">
      <div className="hidden lg:block">
        <ExpertServicesList user={user} />
      </div>
      <div className="hidden lg:block">
        <OtherExpert />
      </div>
      <div className="pt-6">
        <div className="w-full px-4 py-6 my-2 bg-slate-200 dark:bg-slate-300 rounded-xl">
          <div className="pb-4">
            <span className=" font-bold text-textDefault">
             جستجو‌های پرتکرار
            </span>
          </div>
          <div className=" flex flex-wrap items-center gap-2 text-xs font-medium">
            {topSearch?.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftProfile;
