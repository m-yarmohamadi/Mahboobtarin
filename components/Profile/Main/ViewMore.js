import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const ViewMore = ({ onClick, complete }) => {
  return (
    <span
      onClick={onClick}
      className="cursor-pointer flex justify-center items-center w-full font-bold text-sm md:text-base text-primary-01 gap-2 pt-2"
    >
      <span>{complete ? <FaAngleUp /> : <FaAngleDown />}</span>
      <span>مشاهده بیشتر</span>
    </span>
  );
};

export default ViewMore;
