import { useCategoryParents } from "@/hooks/useMainPage";
import Platform from "@/tools/Platform";
import SearchBox from "@/tools/SearchBox";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";

const ProfileSearchBox = ({ user }) => {
  const { categoryParents, isGetCateParent } = useCategoryParents(
    user?.expertises[0].title
  );

  return (
    <div className="">
      <div className="w-full container  bg-primary-01 md:rounded-b-3xl">
        <div className="text-white w-full flex flex-col justify-between items-start pb-48 gap-6">
          <div
            className={`w-full flex flex-col xs:flex-row pt-4 gap-4 items-center justify-between duration-100 ${
              isGetCateParent ? "opacity-40 blur-sm" : ""
            }`}
          >
            <div className="url-params-profile-page flex justify-center items-center gap-1 text-xs md:text-sm group">
              {!isGetCateParent && <UrlItem data={categoryParents} />}
            </div>
            <div className="flex justify-center items-center ">
              <Platform color={`text-primary-03`} colorHover={`text-white`} />
            </div>
          </div>
          <div className="xs:w-2/3 lg:w-1/3 mx-auto">
            <SearchBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSearchBox;

function UrlItem({ data }) {
  return (
    <>
      {data.parent_recursive && <UrlItem data={data.parent_recursive} />}
      <span className="url-params-profile-page__item">
        {data.name}
      </span>
      <FaAngleLeft className="last:hidden"/>
    </>
  );
}
