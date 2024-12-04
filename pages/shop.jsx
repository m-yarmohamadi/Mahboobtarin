import Header from "@/components/Header";
import Slider from "@/components/shop/Slider";
import SpecialSell from "@/components/shop/SpecialSell";
import Categoreis from "@/components/shop/Categories";
import BestSellers from "@/components/shop/BestSellers";
import SelectedDiscounts from "@/components/shop/SelectedDiscounts";
import PopularBrands from "@/components/shop/PopularBrands";
import SupportOption from "@/components/shop/SupportOption";
import Footer from "@/components/Footer";
import { useShopPage } from "@/hooks/useProducts";
import Loading from "@/tools/Loading";

export default function shop() {
    const { shopData, isLoading } = useShopPage();
    const { banners, most_popular_brands, categories, discount_products, special_sale, best_price, support_messages } = shopData || {};

    if (isLoading) return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loading customeColor={'#0693a4'} />
        </div>
    );

    return (
        <div>
            <Header />
            <Slider sliders={banners["shop-top-sliders"]} />
            <SpecialSell products={special_sale} />
            <Categoreis categories={categories} />

            <div className="md:mx-auto md:container p-6 mt-14">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {
                        banners["shop-bottom-category"].length > 0 &&
                        banners["shop-bottom-category"].map((item, index) => (
                            <div key={index} className="w-full rounded-lg overflow-hidden">
                                <img src={item.photo.path} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))
                    }
                </div>
                {
                    banners["shop-top-bestsellers"].length > 0 &&
                    <div className="w-full h-[250px] rounded-lg overflow-hidden">
                        <img src={banners["shop-top-bestsellers"][0].photo.path} alt="" className="w-full h-full object-cover object-center" />
                    </div>
                }
            </div>

            <BestSellers products={best_price} />
            <SelectedDiscounts products={discount_products} />

            {
                banners["shop-top-brands"].length > 0 &&
                <div className="w-full h-[250px] mt-9">
                    <img src={banners["shop-top-brands"][0].photo.path} alt="" className="w-full h-full object-cover object-center" />
                </div>
            }

            <PopularBrands brands={most_popular_brands} />
            <SupportOption supportOptions={support_messages} />
            <Footer />
        </div>
    )
}
