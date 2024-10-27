import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CourseCard from "./CourseCard";
import { useGetAcademyBestSell } from "@/hooks/useAcademy";

export default function Newest() {
    const { academyList, isLoading } = useGetAcademyBestSell();
    const course = {
        img: "/images/img01.jpg",
        title: "نام دوره",
        teacher: "نام استاد",
        numOfStudents: "35",
        teacherPic: "/images/AliArdam.jpg",
        price: "312000"
    }

    if (isLoading) return null;

    return (
        <div className="md:mx-auto md:container p-4 my-8 bg-white rounded-lg">
            <div className="w-full flex flex-col sm:flex-row gap-6 items-center justify-between mb-6">
                <h3 className="text-2xl text-slate-800 font-semibold">
                    جدیدترین‌ها
                </h3>
                <button className='text-primary-01 btn gap-1 !text-sm !py-2'>
                    مشاهده همه
                    <FaAngleLeft className='w-4 h-4' />
                </button>
            </div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={'auto'}
                navigation={{
                    nextEl: '#newest-course-btn-next',
                    prevEl: '#newest-course-btn-prev'
                }}
                className="newest-course-slider"
            >
                {academyList?.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className="!w-[250px] ml-4">
                            <CourseCard course={item} />
                        </SwiperSlide>
                    );
                })}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
                    <button id="newest-course-btn-next" className="btn btn--outline disabled:!hidden !p-2 !bg-white !rounded-full">
                        <FaAngleLeft className='w-5 h-5' />
                    </button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
                    <button id="newest-course-btn-prev" className="btn btn--outline disabled:!hidden !p-2 !bg-white !rounded-full">
                        <FaAngleRight className='w-5 h-5' />
                    </button>
                </div>
            </Swiper>
        </div>
    )
}
