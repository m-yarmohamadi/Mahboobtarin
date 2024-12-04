import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function RequestPhotos({ photos }) {
    return (
        <div>


            <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={24}
                pagination
            >
                {photos.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={item.path}
                                    alt=""
                                    className="w-full h-full object-cover object-center sm:rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}
