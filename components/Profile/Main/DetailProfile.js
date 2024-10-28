import React, { useState } from "react";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import PN from "persian-number";
import {
  FaHeart,
  FaMapLocationDot,
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
import { useFollow, useLikeOrDislike } from "@/hooks/useDashboard";
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

const mostPopular = [
  {
    id: 1,
    title: "رنگ",
    value: "زرد",
  },
  {
    id: 2,
    title: "رشته ورزشی",
    value: "فوتبال",
  },
  {
    id: 3,
    title: "تیم ورزشی",
    value: "استقلال",
  },
  {
    id: 4,
    title: "مرکز خرید",
    value: "تیراژه",
  },
  {
    id: 5,
    title: "شاعر",
    value: "حافظ",
  },
  {
    id: 6,
    title: "پاتوق",
    value: "کافه ملانا",
  },
  {
    id: 7,
    title: "تیم ورزشی",
    value: "استقلال",
  },
  {
    id: 8,
    title: "مرکز خرید",
    value: "اطلس مال",
  },
  {
    id: 9,
    title: "شاعر",
    value: "سعدی",
  },
  {
    id: 10,
    title: "رشته ورزشی",
    value: "فوتبال",
  },
  {
    id: 11,
    title: "تیم ورزشی",
    value: "استقلال",
  },
  {
    id: 12,
    title: "مرکز خرید",
    value: "ایران مال",
  },
];
const product = [
  {
    id: 1,
    url: "/images/Book001.png",
    name: "پاستیل بنفش",
    ouner: "کاترین اپل گیت",
    Publications: "...",
    Price: 128000,
    Discount: 83,
    Supplier: "امیر عزیزی",
    SupplierUrl: "/images/KavehBehbahani.jpg",
  },
  {
    id: 2,
    url: "/images/Book002.png",
    name: "12 قانون برای زندگی",
    ouner: "جردن پیترسون",
    Publications: "...",
    Price: 398000,
    Discount: 77,
    Supplier: "علی محمودی",
    SupplierUrl: "/images/KavehBehbahani.jpg",
  },
  {
    id: 3,
    url: "/images/Book003.png",
    name: "انسان در جستجوی معنا",
    ouner: "ویکتور فرانگل",
    Publications: "...",
    Price: 138000,
    Discount: 73,
    Supplier: "سحر عمادی",
    SupplierUrl: "/images/KavehBehbahani.jpg",
  },
];

const DetailProfile = ({ userData, isFollow, isLike, popularList }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [score, setScore] = useState(0);
  const { followHandler } = useFollow();
  const { likeDislikeHandler } = useLikeOrDislike();

  const getCountryLabel = [...Countries].filter(
    (c) => c.value === userData?.nationality
  )[0]?.label;
  const { provinces, isLoading } = useGetProvinces();
  const getProvinceLabel =
    !isLoading &&
    provinces.filter((p) => Number(p.id) === Number(userData?.province_id))[0]
      ?.name;

  const DiscountCalculation = (i, d) => {
    return i - (i * d) / 100;
  };
  console.log(userData);

  const expertFollowHandler = () => {
    followHandler(userData.id, `${userData?.name} ${userData?.lastname}`);
    router.replace(pathname, { scroll: false });
  };

  const expertLikeHandler = () => {
    likeDislikeHandler(userData.id);
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="w-full">
      <div id="personalinfo" className="w-full">
        <div className="flex justify-between gap-3 -mt-24 md:-mt-16">
          <div className="flex flex-col justify-end items-center gap-2">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-02 overflow-hidden flex items-center justify-center">
              <img
                className={
                  !userData?.avatar[0]?.path
                    ? "w-11 h-11 md:w-12 md:h-12"
                    : "w-full h-full object-cover"
                }
                src={userData?.avatar[0]?.path || "/images/defaultUser.png"}
                alt={`${userData?.name} ${userData?.lastname} `}
              />
            </div>
            <span className="bg-green-300 dark:bg-green-700 text-xs font-semibold text-slate-700 rounded-full py-1 px-4">
              فعال
            </span>
          </div>
          <div className="flex justify-end gap-3 text-sm font-medium text-slate-800 pt-20">
            <span className="flex justify-end items-center gap-1">
              <FaRegCircleCheck className="w-6 h-6 text-blue-500" />
            </span>

            <div>
              <button
                onClick={expertFollowHandler}
                className={`btn ${
                  isFollow ? "btn--secondary" : "btn--primary"
                }`}
              >
                {isFollow ? "لغو دنبال کردن" : "دنبال کردن"}
              </button>
            </div>

            {/* <button
              onClick={expertLikeHandler}
              className="flex justify-end items-center gap-1"
            >
              {isLike ? (
                <FaHeart className="w-6 h-6 text-red-600" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-red-600" />
              )}
            </button> */}
            <span className="flex justify-end items-center gap-1">
              <IoShareSocialOutline className="w-6 h-6 text-green-500" />
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className=" font-bold text-xl md:text-2xl text-textDefault">
              {" "}
              {userData?.name}
              {` `}
              {userData?.lastname}
            </span>
            <span className=" text-xs text-slate-700">{userData?.email}</span>
            <div className="flex justify-center items-center gap-1 py-2">
              {userData?.expertises?.map((expertise, index) => (
                <div key={index}>
                  <span className="bg-primary-01 rounded-sm px-1 text-xs md:text-sm text-slate-100">
                    {expertise.subject}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* <div>
						<button
							onClick={expertFollowHandler}
							className={`btn ${isFollow ? 'btn--secondary' : 'btn--primary'}`}>
							{isFollow ? 'لغو دنبال کردن' : 'دنبال کردن'}
						</button>
					</div> */}
        </div>

        <div className="lg:hidden pt-6">
          <ExpertServicesList user={userData} />
        </div>

        {/* بیوگرافی */}
        <About description={userData?.description} />
        <div className="flex flex-col xs:flex-row justify-between gap-2 pt-6">
          <div className="space-y-2">
            <span className="flex items-center w-full gap-4 text-sm md:text-base">
              <span className="flex justify-center items-center text-slate-800 font-semibold">
                <HiOutlineLocationMarker className="w-6 h-6 ml-1" />
                <span>{getCountryLabel}،</span>
                <span>{getProvinceLabel}</span>
              </span>
            </span>
            <span className="text-xs md:text-sm mr-[2px] flex items-center gap-1 whitespace-nowrap text-slate-800 font-semibold">
              <FaRegCalendar className="w-5 h-5 text-slate-800" />
              <span className="text-slate-600 font-normal">تاریخ پیوستن :</span>
              {new Date(userData?.created_at).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="space-y-2">
            {userData?.amount_experience_year ? (
              <div className="flex items-center  text-xs md:text-sm text-slate-800 font-semibold">
                <BiMedal className="w-7 h-7 text-green-600 ml-1" />
                <span className="text-slate-600 font-normal">تجربه :</span>
                {userData?.amount_experience_year} سال
              </div>
            ) : null}
            <span className="flex items-center gap-1 text-xs md:text-sm text-slate-800">
              <FaRegStar className="w-6 h-6 text-yellow-400 mr-[2px]" />
              <span>{enToFaNumber("4.90 (از 24 نظر)")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* نشانی */}
      <div id="address" className="pt-16">
        <TitleItems title={"نشانی"} />
        <div className="w-full grid grid-cols-1 gap-2">
          <div className="w-full flex flex-col gap-4">
            {userData?.phone && (
              <div className="w-full text-slate-800 text-sm flex justify-start items-center gap-2">
                <span className="font-bold">تلفن:</span>
                <span>{userData?.phone} </span>
              </div>
            )}
            {userData?.addresses.length ? (
              <div className="w-full text-sm text-slate-800 flex flex-col gap-1">
                <span className="w-full font-bold">آدرس : </span>
                <span className="break-words">
                  {userData?.addresses[0].address}
                </span>
              </div>
            ) : null}
          </div>
          {userData?.addresses.length &&
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

      {/* تخصص و مهارت */}
      <ExpertDescription expert_description={userData?.expert_description} />

      {/* آثار و افتخارات */}
      <HonorsDescription honors_description={userData?.honors_description} />

      <div className="lg:hidden">
        <OtherExpert />
      </div>

      {/* گالری */}
      <Gallery gallery={userData?.gallery || []} />

      {/* لینکدونی */}
      <Linkdoni link_dooni={userData?.link_dooni || []} user={userData}/>

      {/* غرفه */}
      <div id="booth" className="w-full pt-16">
        <div className="flex justify-between items-end py-2">
          <TitleItems title={"غرفه"} />
          <LeftAndRightArrows />
        </div>

        <div className="w-full">
          <Swiper
            modules={[Navigation]}
            slidesPerView={"auto"}
            navigation={{
              nextEl: "#booth-expert-btn-next",
              prevEl: "#booth-expert-btn-prev",
            }}
          >
            {product.map((item, index) => {
              return (
                <SwiperSlide key={index} className="!w-[250px] ml-4">
                  <div className="border border-slate-300 bg-gradient-to-b  from-blue-100 dark:from-slate-500  to-white overflow-hidden rounded-xl hover:shadow-md dark:shadow-darkMd hover:cursor-pointer">
                    <div className="border-b border-slate-300 rounded-t-xl bg-gradient-to-tl from-transparent hover:from-blue-100 to-white">
                      <div className="aspect-w-8 aspect-h-8">
                        <img
                          className="w-full h-full object-contain p-6 object-center"
                          src={item.url}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 p-2">
                      <span className="line-clamp-1 font-extrabold truncate">
                        {item.name}
                      </span>
                      <span className="text-xs md:text-sm">{item.ouner}</span>
                      <span className="line-clamp-1 text-xs text-slate-500">
                        انتشارات:{item.Publications}
                      </span>
                    </div>
                    <div className="flex justify-between p-4 items-end gap-3">
                      <div className="py-1 px-2 text-sm bg-primary-01 text-white font-bold rounded-md flex justify-center items-center">
                        %{PN.convertEnToPe(`${item.Discount}`)}
                      </div>
                      <div className=" flex flex-col justify-start items-center">
                        <del className="text-slate-400">
                          {numberWithCommas(`${item.Price}`)}
                        </del>
                        <span className="font-bold">
                          {numberWithCommas(
                            `${DiscountCalculation(item.Price, item.Discount)}`
                          )}
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* <div className='w-full grid xs:grid-cols-2 md:grid-cols-3  gap-4'>
						{product.map((item) => {
							return (
							);
						})}
					</div> */}
      </div>

      {/* نظرات کاربران */}
      <div id="comments" className="pt-16">
        <TitleItems title={"نظرات کاربران"} />
        <div className="w-full ">
          <Comments motekhases_id={userData?.id} />
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
