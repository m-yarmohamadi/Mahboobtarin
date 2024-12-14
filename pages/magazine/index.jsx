import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MagazineCard from "@/components/magazine/MagazineCard";
import MagzineCategories from "@/components/magazine/MagzineCategories";
import OthersPosts from "@/components/magazine/OthersPosts";
import Pagination from "@/components/magazine/Pagination";
import ResourceLinksBox from "@/components/magazine/resourceLinks/ResourceLinksBox";
import TitleItems from "@/components/Profile/Main/TitleItems";
import useMagazine from "@/hooks/useMagazine";
import { getAllMagazineApi } from "@/services/magazineService";
import Loading from "@/tools/Loading";

export default function Magazine() {
    const { magazineData, isLoading } = useMagazine();
    const { banners, category, similar_post } = magazineData || {};

    if (isLoading) return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loading customeColor={'#0693a4'} />
        </div>
    );

    return (
        <>
            <Header />
            <div className="w-full lg:grid lg:grid-cols-12 lg:gap-6 lg:container lg:pt-6">
                <div className="lg:col-span-4 h-full">
                    <MagzineCategories category={category} />
                </div>
                <div className="lg:hidden">
                    <MagazineCard post={similar_post[0]}/>
                </div>
                <div className="lg:col-span-8 h-full">
                    <img src={banners.top_banner.photo.path} alt="" className="w-full h-full object-cover object-center" />
                </div>
            </div>

            <div className="md:container">
                <div className="w-full bg-slate-50 dark:bg-slate-200 mt-6 py-7 md:px-10">
                    <div className="hidden lg:block mb-8">
                        <MagazineCard post={similar_post[0]}/>
                    </div>

                    <div>
                        <div className="px-6 md:px-0">
                            <OthersPosts posts={similar_post}/>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end bg-primary-01 p-6">
                    <Pagination totalPages={12} />
                </div>
            </div>

            <div className="w-full mt-10">
                <img src={banners.top_linkdooni.photo.path} alt="" className="w-full h-full object-cover object-center" />
            </div>

            <div className="md:container mt-14">
                <TitleItems title={"لینکدونی"} className="!text-lg !border-r-4 !text-textDefault !py-0.5" />
                <div className="w-full grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <ResourceLinksBox title={'سیاسی'} />
                    <ResourceLinksBox title={'هنری'} />
                </div>
                <div className="w-full py-6">
                    <img src={banners.bottom_linkdooni.photo.path} alt="" className="w-full h-full object-cover object-center" />
                </div>
                <div className="w-full grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <ResourceLinksBox title={'ورزشی'} />
                    <ResourceLinksBox title={'اقتصادی'} />
                </div>
                <div className="w-full py-6">
                    <img src={banners.bottom_linkdooni.photo.path} alt="" className="w-full h-full object-cover object-center" />
                </div>
                <div className="w-full grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <ResourceLinksBox title={'سیاسی'} />
                    <ResourceLinksBox title={'سیاسی'} />
                </div>
            </div>
            <Footer />
        </>
    )
}
