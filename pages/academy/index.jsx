import Categories from "@/components/academy/Categories";
import Newest from "@/components/academy/Newest";
import Populars from "@/components/academy/Populars";
import Suggestion from "@/components/academy/Suggestion";
import LoadingAdmin from "@/components/admin/LoadingAdmin";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAllOrOneAcademy } from "@/hooks/useAcademy";

export default function AcademyPage() {
    const { academyData, isLoading } = useAllOrOneAcademy();
    const { banners, newest, offers, best_price, best_sell, categories } = academyData || {};

    if (isLoading) return <LoadingAdmin />

    return (
        <div>
            <Header />
            <div className="w-full h-[250px]">
                <img
                    src={banners["academy-top-page"]?.photo?.path}
                    alt={banners["academy-top-page"]?.title}
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <Populars data={best_price} />

            <div className="md:h-[350px] p-4 lg:p-0 md:mx-auto md:container grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6">
                <div className="w-full rounded-lg overflow-hidden md:col-span-4">
                    <img
                        src="/images/img002.jpg" alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full rounded-lg overflow-hidden md:row-span-2 md:col-span-8">
                    <img
                        src={banners["academy-popular-big"]?.photo?.path}
                        alt={banners["academy-popular-big"]?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full rounded-lg overflow-hidden md:col-span-4">
                    <img
                        src={banners["academy-popular-right-bottom"]?.photo?.path}
                        alt={banners["academy-popular-right-bottom"]?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <Newest data={newest} />
            <Categories categories={categories} />
            <Suggestion data={offers} />

            <div className="w-full p-6">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {banners["academy-bottom-offers"].map((item, index) => (
                        <div key={index} className="w-full rounded-lg overflow-hidden">
                            <img src={item?.photo?.path} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    ))}
                    {/* <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/omicron.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/liraglotide.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/omicron.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/liraglotide.webp" alt="" className="w-full h-full object-cover" />
                    </div> */}
                </div>
                <div className="w-full h-auto rounded-lg overflow-hidden mt-6">
                    <img
                        src={banners["academy-top-footer"]?.photo?.path}
                        alt={banners["academy-top-footer"]?.title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}
