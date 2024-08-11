import Header from "@/components/Header";
import Slider from "@/components/shop/Slider";
import SpecialSell from "@/components/shop/SpecialSell";
import Categoreis from "@/components/shop/Categories";
import BestSellers from "@/components/shop/BestSellers";
import SelectedDiscounts from "@/components/shop/SelectedDiscounts";
import PopularBrands from "@/components/shop/PopularBrands";
import SupportOption from "@/components/shop/SupportOption";
import Footer from "@/components/Footer";

const sliders = [
    {
        image: "/images/img001.jpg",
    },
    {
        image: "/images/img002.jpg",
    },
    {
        image: "/images/img003.jpg",
    },
]

export default function shop() {
    return (
        <div>
            <Header />
            <Slider sliders={sliders} />
            <SpecialSell />
            <Categoreis />

            <div className="md:mx-auto md:container p-6 mt-14">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/omicron.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/liraglotide.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/omicron.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/gardasil.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full h-[250px] rounded-lg overflow-hidden">
                    <img src="/images/Baner004.png" alt="" className="w-full h-full object-cover object-center" />
                </div>
            </div>

            <BestSellers />
            <SelectedDiscounts />

            <div className="w-full h-[250px] mt-9">
                <img src="/images/Baner004.png" alt="" className="w-full h-full object-cover object-center" />
            </div>

            <PopularBrands />
            <SupportOption />
            <Footer />
        </div>
    )
}
