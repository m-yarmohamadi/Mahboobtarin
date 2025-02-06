import LeftAndRightArrows from "@/tools/LeftAndRightArrows";
import TitleItems from "../TitleItems";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/shop/ProductCard";
import { Navigation } from "swiper/modules";

export default function ExpertProducts({ products, user }) {

    if (products.length > 0) {
        return (
            <div id="products" className="w-full pb-16">
                <div className="flex justify-between items-end py-2">
                    <TitleItems title={"غرفه"} />
                </div>
                <div className="w-full">
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={"auto"}
                    >
                        {products.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className="!w-[250px] ml-4">
                                    <ProductCard product={item} user={user} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        )
    }
}
