import React from "react";
import RightMenu from "./RightMenu";
import DetailProfile from "./DetailProfile";
import LeftProfile from "./LeftProfile";

const MainProfile = ({ userData, isFollow, isLike, popularList }) => {
  return (
    <div className=" w-full bg-white !p-6 md:!pr-0 rounded-ss-3xl -mt-36 md:-mt-32">
      <div className=" pb-16 w-full rounded-ss-3xl  h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          <div className="w-full flex flex-col md:grid md:grid-cols-10 lg:col-span-8 gap-8">
            <div className="md:col-span-3 w-full ">
              <RightMenu userData={userData} popularList={popularList}/>
            </div>
            <div className=" md:col-span-7 bg-white w-full">
              <DetailProfile
                userData={userData}
                isFollow={isFollow}
                isLike={isLike}
                popularList={popularList}
              />
            </div>
          </div>
          <div className=" lg:col-span-4 w-full">
            <LeftProfile user={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
