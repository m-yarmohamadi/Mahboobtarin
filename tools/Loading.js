import { ThreeDots } from "react-loader-spinner";
import React from "react";

const Loading = ({ customeColor, numOfLoading = 2, width = 100 }) => {
  return (
    <ThreeDots
      visible={true}
      height="20"
      width={width}
      color={customeColor || "#ffffff"}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loading;
