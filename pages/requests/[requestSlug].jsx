import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MapView from "@/components/mapComponent/MapView";
import ReqeustOptions from "@/components/requests/requestSinglePage/ReqeustOptions";
import RequestDetails from "@/components/requests/requestSinglePage/RequestDetails";
import RequestPhotos from "@/components/requests/requestSinglePage/RequestPhotos";
import UrlItem from "@/components/requests/requestSinglePage/UrlItem";
import http from "@/services/httpService";
import getOS from "@/utils/getOS";
import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Request({ request }) {
    const { photos, title, description, address, lat, lng } = request;
    
    return (
        <>
            <Header />
            <div className="container sm:mt-6 px-0 md:px-10">
                <div className="w-full sm:bg-white sm:rounded-3xl sm:p-6">
                    {/* url */}
                    <div className="hidden lg:block pb-12">
                        <UrlItem request={request} />
                    </div>

                    {/* details */}
                    <div className="w-full lg:grid lg:grid-cols-12 lg:gap-14">
                        <div className="pb-4 col-span-5">
                           <RequestPhotos photos={photos}/>
                            <div className="pt-3 lg:hidden px-4 sm:px-0">
                                <UrlItem request={request} />
                            </div>
                            <h1 className="pt-4 px-4 sm:px-0 text-lg lg:text-2xl font-bold text-slate-900 lg:leading-9">
                                <span className="inline-block w-2 h-2 lg:w-3 lg:h-3 bg-slate-900 ml-2"></span>
                                {title}
                            </h1>
                        </div>

                        <div className="lg:col-span-3 px-4 sm:px-0">
                            <ReqeustOptions request={request} />
                        </div>
                        <div className="lg:col-span-4 px-4 sm:px-0">
                            <RequestDetails request={request} />
                        </div>
                    </div>

                    {/* description */}
                    <div className="w-full pt-6 lg:pt-0 px-4 sm:px-0">
                        <h4 className="text-sm  lg:text-lg font-bold text-secondary-01 pb-3">
                            توضیحات
                        </h4>
                        <div className="w-full p-4 lg:p-6 rounded-lg text-xs lg:text-base text-slate-800 leading-6 lg:leading-8 bg-slate-200">
                            <p>
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* map */}
                    {address || lat ?
                        <div className="w-full pt-6 lg:max-w-[50%] px-4 sm:px-0">
                            <h4 className="text-sm lg:text-lg font-bold text-slate-900 pb-1">
                                آدرس
                            </h4>
                            <p className="text-sm lg:text-base text-slate-800 pb-4">
                                {address}
                            </p>
                            {lat && lng &&
                                <div className="w-full h-[200px] relative border border-primary-01 rounded-md overflow-hidden">
                                    <MapView coord={[lat, lng]} />
                                    <div className="absolute bottom-4 right-4  ">
                                        {getOS() === "android" ? (
                                            <Link
                                                href={`geo:${lat},${lng}`}
                                                className="btn btn--secondary !text-xs !w-auto !gap-2"
                                            >
                                                <FaMapLocationDot className="w-4 h-4" />
                                                مشاهده روی مسیریاب
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`https://www.google.com/maps?q=${lat},${lng}`}
                                                className="btn btn--secondary !text-xs !w-auto !gap-2"
                                                target="_blank"
                                            >
                                                <FaMapLocationDot className="w-4 h-4" />
                                                مشاهده روی مسیریاب
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>

                        :
                        null
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { params: { requestSlug } } = ctx;
    const { data } = await http.get(`/api/v1/requests/list/${requestSlug}`);

    if (Object.keys(data).length === 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            request: data
        }
    }
}