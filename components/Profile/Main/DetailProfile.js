import React, { useState } from "react";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import PN from "persian-number";
import {
  FaHeart,
  FaMapLocationDot,
  FaRegBookmark,
  FaRegCalendar,
  FaRegCircleCheck,
} from "react-icons/fa6";
import TitleItems from "./TitleItems";
import LeftAndRightArrows from "@/tools/LeftAndRightArrows";
import { enToFaNumber } from "@/utils/enToFa";
import { Countries } from "@/data/countries";
import { useGetProvinces } from "@/hooks/useCity";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiMedal } from "react-icons/bi";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import numberWithCommas from "@/utils/numberWithCommas";
import { useLikeOrDislike } from "@/hooks/useDashboard";
import Comments from "./Comments";
import { usePathname, useRouter } from "next/navigation";
import Linkdoni from "./detailProfileComponents/Linkdoni";
import Gallery from "./detailProfileComponents/Gallery";
import PopularsList from "./detailProfileComponents/PopularsList";
import About from "./detailProfileComponents/About";
import ExpertDescription from "./detailProfileComponents/ExpertDescription";
import HonorsDescription from "./detailProfileComponents/HonorsDescription";
import MapView from "@/components/mapComponent/MapView";
import Link from "next/link";
import getOS from "@/utils/getOS";
import ExpertServicesList from "./detailProfileComponents/ExpertServicesList";
import OtherExpert from "./detailProfileComponents/OtherExpert";
import ExpertGrade from "./detailProfileComponents/ExpertGrade";
import ExpertLanguage from "./detailProfileComponents/ExpertLanguage";
import FollowDetails from "./detailProfileComponents/FollowDetails";
import { BsFillPatchCheckFill } from "react-icons/bs";
import UserData from "./detailProfileComponents/UserData";
import { toPersianDateLong } from "@/utils/toPersianDate";
import MenuDetails from "./detailProfileComponents/MenuDetails";
import FollowsList from "./detailProfileComponents/FollowsList";
import BookmarkUser from "./detailProfileComponents/BookmarkUser";
import { useFollow } from "@/hooks/expertHooks/useFollow";
import ExpertProducts from "./detailProfileComponents/ExpertProducts";

const DetailProfile = ({
  userData,
  isFollow,
  isLike,
  isMarked,
  popularList,
  starsData,
  commentsData,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { followHandler } = useFollow();
  const { likeDislikeHandler } = useLikeOrDislike();
  const [stepFollow, setStepFollow] = useState(0);

  const getCountryLabel = [...Countries].filter(
    (c) => c.value === userData?.nationality
  )[0]?.label;
  const { provinces, isLoading } = useGetProvinces();
  const getProvinceLabel =
    !isLoading &&
    provinces.filter((p) => Number(p.id) === Number(userData?.province_id))[0]
      ?.name;

  const expertFollowHandler = () => {
    followHandler(userData.id, `${userData?.name} ${userData?.lastname}`);
    router.replace(pathname, { scroll: false });
  };
  console.log(userData);

  const expertLikeHandler = () => {
    likeDislikeHandler(userData.id);
    router.replace(pathname, { scroll: false });
  };

  const permissions = userData?.permissions
    ? JSON.parse(userData?.permissions)
    : {};

  if (stepFollow !== 0) {
    return (
      <FollowsList
        stepFollow={stepFollow}
        onChangeStep={setStepFollow}
        userData={userData}
      >
        <UserData userData={userData} />
      </FollowsList>
    );
  }

  return (
    <>
      <div
        id="personalinfo"
        className="w-full flex justify-between lg:justify-normal gap-3 lg:gap-6 -mt-20 md:-mt-16"
      >
        <div>
          <div className="w-20 h-20 md:w-24 md:h-24 relative bg-primary-02 rounded-full flex items-center justify-center">
            <img
              className={"w-full h-full object-cover  rounded-full"}
              src={userData?.avatar[0]?.path || "/images/user.png"}
              alt={`${userData?.name} ${userData?.lastname} `}
            />
            <div className="absolute w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-600 bottom-1.5 left-1.5 lg:bottom-2 lg:left-2"></div>
          </div>
        </div>

        <div className="lg:w-full flex items-center lg:items-start lg:justify-between gap-2 sm:gap-4 pt-12 md:pt-16">
          <div className="lg:hidden">
            <FollowDetails onChangeStep={setStepFollow} userData={userData} />
          </div>

          <div className="hidden lg:block">
            <UserData userData={userData} />
          </div>

          <div className="space-y-4">
            <button
              onClick={expertFollowHandler}
              className={`btn whitespace-nowrap !py-1.5 !px-4 !rounded-full !text-xs sm:!text-sm ${isFollow ? "btn--outline" : "bg-slate-900 !text-slate-100"
                }`}
            >
              {isFollow ? "لغو دنبال کردن" : "دنبال کردن"}
            </button>

            <div className="flex items-center justify-around text-slate-900 lg:hidden">
              <BookmarkUser expertiseId={userData.id} isMark={isMarked} />
              <span className="">
                <IoShareSocialOutline className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 lg:hidden">
        <UserData userData={userData} />
      </div>
      <div className="border-y px-6 pb-2  -mx-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-4 pt-6 ">
          <span className="flex items-center w-full gap-4 text-sm md:text-base">
            <span className="flex justify-center items-center text-slate-800 font-semibold">
              <HiOutlineLocationMarker className="w-5 h-5" />
              <span>{getCountryLabel}</span>
              <pre>، </pre>
              <span>{getProvinceLabel}</span>
            </span>
          </span>
          <span className="text-xs flex items-center gap-1 text-slate-800 font-semibold">
            <FaRegCalendar className="w-4 h-4 text-slate-800" />
            <span className="text-slate-600 font-normal">تاریخ پیوستن :</span>
            {toPersianDateLong(userData?.created_at)}
          </span>
          <span className="text-xs flex items-center gap-1 text-slate-800 font-semibold">
            <FaRegCalendar className="w-4 h-4 text-slate-800" />
            <span className="text-slate-600 font-normal">متولد :</span>
            {toPersianDateLong(userData?.birthday)}
          </span>

          <span className="flex items-center gap-1 text-xs md:text-sm text-slate-800">
            <FaRegStar className="w-5 h-5 text-yellow-400" />
            <span>{enToFaNumber(`${starsData} (از ${commentsData} نظر)`)}</span>
          </span>

          <span className="w-full hidden lg:flex items-center xl:justify-between gap-2 font-bold">
            <BookmarkUser expertiseId={userData.id} isMark={isMarked} />


          </span>




          <div className="w-full hidden lg:flex items-center xl:justify-between gap-2 font-bold">
            <div className="flex items-center gap-1 text-xs text-slate-800">
              <IoShareSocialOutline className="w-5 h-5" />
              <span>اشتراک گذاری</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-between items-center pe-16 pt-6 lg:pb-4">
          <FollowDetails onChangeStep={setStepFollow} userData={userData} />
          {userData?.amount_experience_year ? (
            <div className="flex items-center  text-xs md:text-sm text-slate-800 font-semibold">
              <BiMedal className="w-6 h-6 text-green-600" />
              <span className="text-slate-600 font-normal">تجربه :</span>
              {userData?.amount_experience_year} سال
            </div>
          ) : null}

        </div>
      </div>

      <div className="md:hidden pt-6 sticky top-[52px] right-0 bg-white z-10 w-full">
        <MenuDetails
          userData={userData}
          popularList={popularList}
          permissions={permissions}
        />
      </div>

      <div className="lg:hidden pt-6">
        <ExpertServicesList user={userData} />
      </div>

      {/* بیوگرافی */}
      <About description={userData?.description} />

      {/* نشانی */}
      {permissions?.phone || permissions?.workAddress ? (
        <div id="address" className="pb-16">
          <TitleItems title={"نشانی"} />
          <div className="w-full grid grid-cols-1 gap-2">
            <div className="w-full flex flex-col gap-4">
              {userData?.phone && permissions?.phone && (
                <div className="w-full text-slate-800 text-sm flex justify-start items-center gap-2">
                  <span className="font-bold">تلفن:</span>
                  <span>{userData?.phone} </span>
                </div>
              )}
              {userData?.addresses.length && permissions?.workAddress ? (
                <div className="w-full text-sm text-slate-800 flex flex-col gap-1">
                  <span className="w-full font-bold">آدرس : </span>
                  <span className="break-words">
                    {userData?.addresses[0].address}
                  </span>
                </div>
              ) : null}
            </div>
            {userData?.addresses.length &&
              permissions?.workAddress &&
              userData?.addresses[0].lat &&
              userData?.addresses[0].lng ? (
              <>
                <div className="py-2">
                  <div className="w-full h-[200px] relative border border-primary-01 rounded-md overflow-hidden">
                    <MapView
                      coord={[
                        userData?.addresses[0].lat,
                        userData?.addresses[0].lng,
                      ]}
                    />
                    <div className="absolute bottom-4 right-4  ">
                      {getOS() === "android" ? (
                        <Link
                          href={`geo:${userData?.addresses[0].lat},${userData?.addresses[0].lng}`}
                          className="btn btn--secondary !text-xs !w-auto !gap-2"
                        >
                          <FaMapLocationDot className="w-4 h-4" />
                          مشاهده روی مسیریاب
                        </Link>
                      ) : (
                        <Link
                          href={`https://www.google.com/maps?q=${userData?.addresses[0].lat},${userData?.addresses[0].lng}`}
                          className="btn btn--secondary !text-xs !w-auto !gap-2"
                          target="_blank"
                        >
                          <FaMapLocationDot className="w-4 h-4" />
                          مشاهده روی مسیریاب
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* تخصص و مهارت */}
      <ExpertDescription expert_description={userData?.expert_description} />

      {/* آثار و افتخارات */}
      <HonorsDescription honors_description={userData?.honors_description} />

      <PopularsList popularList={popularList || []} userData={userData} />

      <ExpertGrade grade={userData?.usergrade || []} />

      <ExpertLanguage languages={userData?.userlanguage || []} />

      {/* گالری */}
      <Gallery gallery={userData?.gallery || []} />

      {/* لینکدونی */}
      <Linkdoni link_dooni={userData?.link_dooni || []} user={userData} />

      <ExpertProducts products={userData?.products || []} user={userData} />

      {/* نظرات کاربران */}
      <div id="comments" className="pb-16">
        <TitleItems title={"نظرات کاربران"} />
        <div className="w-full ">
          <Comments motekhases_id={userData?.id} userData={userData} />
        </div>
      </div>

      <div className="lg:hidden">
        <OtherExpert />
      </div>
    </>
  );
};

export default DetailProfile;
