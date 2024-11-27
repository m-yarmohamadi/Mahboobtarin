import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Map from "@/components/mapComponent/Map";
import MapView from "@/components/mapComponent/MapView";
import ReqeustOptions from "@/components/requests/requestSinglePage/ReqeustOptions";
import RequestDetails from "@/components/requests/requestSinglePage/RequestDetails";
import UrlItem from "@/components/requests/requestSinglePage/UrlItem";
import getOS from "@/utils/getOS";
import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Request() {
    return (
        <>
            <Header />
            <div className="container sm:mt-6 px-0 md:px-10">
                <div className="w-full sm:bg-white sm:rounded-3xl sm:p-6">
                    {/* url */}
                    <div className="hidden lg:block pb-12">
                        <UrlItem data={{ name: "بازیگری", parent_recursive: { name: "هنر", parent_recursive: { name: "فراخوان" } } }} />
                    </div>

                    {/* details */}
                    <div className="w-full lg:grid lg:grid-cols-12 lg:gap-14">
                        <div className="pb-4 col-span-5">
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src="/images/img01.jpg"
                                    alt=""
                                    className="w-full h-full object-cover object-center sm:rounded-lg"
                                />
                            </div>
                            <div className="pt-3 lg:hidden px-4 sm:px-0">
                                <UrlItem data={{ name: "بازیگری", parent_recursive: { name: "هنر", parent_recursive: { name: "فراخوان" } } }} />
                            </div>
                            <h1 className="pt-4 px-4 sm:px-0 text-lg lg:text-2xl font-bold text-slate-900 lg:leading-9">
                                <span className="inline-block w-2 h-2 lg:w-3 lg:h-3 bg-slate-900 ml-2"></span>
                                فراخوان بازیگری در فیلم سینمایی با حضور بازیگران مطرح
                            </h1>
                        </div>

                        <div className="lg:col-span-3 px-4 sm:px-0">
                            <ReqeustOptions />
                        </div>
                        <div className="lg:col-span-4 px-4 sm:px-0">
                            <RequestDetails />
                        </div>
                    </div>

                    {/* description */}
                    <div className="w-full pt-6 lg:pt-0 px-4 sm:px-0">
                        <h4 className="text-sm  lg:text-lg font-bold text-secondary-01 pb-3">
                            توضیحات
                        </h4>
                        <div className="w-full p-4 lg:p-6 rounded-lg text-xs lg:text-base text-slate-800 leading-6 lg:leading-8 bg-slate-200">
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            </p>
                        </div>
                    </div>

                    {/* map */}
                    <div className="w-full pt-6 lg:max-w-[50%] px-4 sm:px-0">
                        <h4 className="text-sm lg:text-lg font-bold text-slate-900 pb-1">
                            آدرس
                        </h4>
                        <p className="text-sm lg:text-base text-slate-800 pb-4">
                            شهرک غرب
                        </p>
                        <div className="w-full h-[200px] relative border border-primary-01 rounded-md overflow-hidden">
                            <MapView
                            />
                            <div className="absolute bottom-4 right-4  ">
                                {getOS() === "android" ? (
                                    <Link
                                        // href={`geo:${userData?.addresses[0].lat},${userData?.addresses[0].lng}`}
                                        href={'#'}
                                        className="btn btn--secondary !text-xs !w-auto !gap-2"
                                    >
                                        <FaMapLocationDot className="w-4 h-4" />
                                        مشاهده روی مسیریاب
                                    </Link>
                                ) : (
                                    <Link
                                        // href={`https://www.google.com/maps?q=${userData?.addresses[0].lat},${userData?.addresses[0].lng}`}
                                        href={'#'}
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

                </div>
            </div>
            <Footer />
        </>
    )
}
