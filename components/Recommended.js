import React from "react";
import RecommendedDoctors from "./RecommendedDoctors";
import RecommendedPsychologists from "./RecommendedPsychologists";
import useMainPage from "@/hooks/useMainPage";

const Recommended = () => {
  const { offer_categories, isLoading } = useMainPage();

  if (isLoading) return null;

  return (
    <div>
      <div className="w-full flex flex-col gap-8">
        {offer_categories.map((item, index) => (
          <RecommendedDoctors key={index} data={item} />
        ))}
      </div>
      {/* <RecommendedPsychologists /> */}
      {/* <div className="py-8 w-full flex justify-center items-center">
        <button
          className="py-2 px-8 bg-primary-01 text-white font-semibold rounded-lg"
          type=""
        >
          موارد بیشتر
        </button>
      </div> */}
    </div>
  );
};

export default Recommended;
