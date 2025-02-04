import Header from "@/components/Header";
import Author from "@/components/magazine/singlePage/Author";
import Comment from "@/components/magazine/singlePage/Comment";
import News from "@/components/magazine/singlePage/News";
import Share from "@/components/magazine/singlePage/Share";
import Url from "@/components/magazine/singlePage/Url";
import http from "@/services/httpService";
import { toPersianDateLong } from "@/utils/toPersianDate";
import toPersianTimeShort from "@/utils/toPersianTime";
import { FaRegHeart } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

export default function MagazineSingle({ post }) {

    return (
        <>
            <Header />
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4 px-4 md:container">
                <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="space-y-6">
                        <div className="w-full h-[500px] bg-green-400 rounded-lg">

                        </div>
                        <div className="w-full h-[300px] bg-blue-400 rounded-lg">

                        </div>
                    </div>
                    <div className="lg:hidden">
                        <News />
                    </div>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-7">
                    <div className="w-full flex flex-col lg:flex-row-reverse gap-5 lg:gap-14 border-b border-b-slate-400 pb-5 mb-5">
                        <div className="space-y-4 w-full lg:pt-6">
                            <Url data={{ name: "مجله محبوب‌ترین", parent_recursive: { name: post.post_category.title } }} />
                            <div>
                                <img src={post.photo.path} alt={post.title} className="rounded-lg" />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-8">
                            <Author author={post.user} />
                            <div className="flex items-center justify-around text-xs text-slate-800">
                                <div>
                                    کد خبر:{post.id}
                                </div>
                                <div>
                                    زمان انتشار {toPersianTimeShort(post.created_at)}
                                </div>
                                <div>
                                    {toPersianDateLong(post.created_at)}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900 pb-3">
                                    {post.title}
                                </h1>
                                <p className="text-sm text-slate-700 font-medium leading-6">
                                    {post.short_desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div dangerouslySetInnerHTML={{__html:post.descriptin}} className="!max-w-none text-sm text-slate-700 font-medium leading-6">
                        </div>
                        <div>
                            <img src={post.photo.path} alt={post.title} className="rounded-lg" />
                        </div>
                        {/* <p className="text-sm text-slate-700 font-medium leading-6">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
                        </p> */}
                    </div>

                    <div className="w-full flex items-center justify-end gap-2 pt-10">
                        <button className="btn gap-2">
                            0
                            <FaRegHeart className="w-5 h-5" />
                        </button>
                        <button className="btn gap-2">
                            <IoWarning className="text-yellow-500 w-5 h-5" />
                            گزارش خطا
                        </button>
                    </div>

                    <Share />
                    <Comment />
                </div>

                <div className="order-3 hidden lg:block lg:col-span-3">
                    <News />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { params: { magazineSlug } } = ctx;
    const { data } = await http.get(`/api/v1/mag/${magazineSlug}`);

    if (Object.keys(data.post).length === 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: data.post
        }
    }
}