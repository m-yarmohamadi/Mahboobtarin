import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaAngleLeft, FaRegComment, FaStar } from 'react-icons/fa6';
import { MdAccessTime } from 'react-icons/md';
import { useState } from 'react';
import Modal from '../Modal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import TextArea from '@/tools/TextArea';
import { AiOutlineComment } from 'react-icons/ai';

export default function Comments({ comments }) {
    const [addComment, setAddComment] = useState(false);
    return (
        <div className="w-full lg:grid grid-cols-12 gap-6 relative items-start">
            <div className='hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 right-0'>
                <div className='text-sm font-medium text-slate-700 flex items-center gap-4'>
                    <FaRegComment className='w-5 h-5 text-slate-800' />
                    {comments && comments.length ?
                        "نظر خود را درباره این محصول بنویسید" : "اولین نظر درباره این محصول را ثبت کنید"}
                </div>
                <button onClick={() => setAddComment(true)} className='btn btn--secondary mt-3 !w-full'>
                    ثبت نظر
                </button>
            </div>
            <CommentListMobile comments={comments} />
            <CommentListDesktop comments={comments} />

            <div onClick={() => setAddComment(true)} className='cursor-pointer lg:hidden flex items-center justify-between py-6 border-t border-t-slate-300 dark:border-t-slate-400 mt-4'>
                <div className='text-sm font-medium text-slate-700 flex items-center gap-4'>
                    <FaRegComment className='w-5 h-5 text-slate-800' />
                    {comments && comments.length ?
                        "نظر خود را درباره این محصول بنویسید" : "اولین نظر درباره این محصول را ثبت کنید"}
                </div>
                <FaAngleLeft className='w-4 h-4 text-slate-600' />
            </div>
            <Modal title={'ایجاد نظر'} open={addComment} onClose={() => setAddComment(false)}>
                <CreateCommentForm onClose={() => setAddComment(false)} />
            </Modal>
        </div>
    )
}

function CommentListMobile({ comments }) {
    return (
        <div className='w-full lg:hidden'>
            <Swiper
                slidesPerView={'auto'}
            >
                {comments?.map((comment, index) => {
                    return (
                        <SwiperSlide key={index} className="!w-[270px] !h-[240px] ml-5 p-4 border border-slate-300 dark:border-slate-400 rounded-xl">
                            <div className='w-full min-h-full flex flex-col gap-3'>
                                <div className='w-full flex items-end justify-between'>
                                    <div className='text-xs text-slate-700'>
                                        نام خریدار
                                    </div>
                                    <div className='flex items-center gap-px'>
                                        {Array(5).fill({}).map((rate, index) => (
                                            <FaStar key={index} className='w-4 h-4 text-yellow-500' />

                                        ))}
                                    </div>
                                </div>
                                <div className='flex-1 pt-3'>
                                    <p className='text-sm text-slate-800'>
                                        عالی
                                    </p>
                                </div>
                                <div>
                                    <div className='text-xs text-slate-600 flex items-center gap-1'>
                                        <MdAccessTime className='w-4 h-4' />
                                        2 خرداد 1403
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

function CommentListDesktop({ comments }) {



    return (
        <div className='col-span-8 xl:col-span-9 hidden lg:flex flex-col gap-4'>

            {
                comments && comments.length ?
                    comments.map((comment, index) => {
                        return (
                            <div key={index} className="!w-full p-6 border border-slate-300 dark:border-slate-400 rounded-xl">
                                <div className='w-full min-h-full flex flex-col gap-3'>
                                    <div className='w-full flex items-end justify-between border-b border-slate-300 dark:border-slate-400 pb-4'>
                                        <div className='text-xs text-slate-700'>
                                            نام خریدار
                                        </div>
                                        <div className='flex items-center gap-px'>
                                            {Array(5).fill({}).map((rate, index) => (
                                                <FaStar key={index} className='w-4 h-4 text-yellow-500' />

                                            ))}
                                        </div>
                                    </div>
                                    <div className='flex-1 pt-3 pb-10'>
                                        <p className='text-sm lg:text-base text-slate-800'>
                                            عالی
                                        </p>
                                    </div>
                                    <div>
                                        <div className='text-xs text-slate-600 flex items-center gap-1'>
                                            <MdAccessTime className='w-4 h-4' />
                                            2 خرداد 1403
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    :
                    <div className='w-full flex flex-col items-center justify-center gap-4 py-10 font-semibold text-textDefault'>
                        <AiOutlineComment className='w-20 h-20 opacity-20' />
                        اولین نظر را درباره این محصول ثبت کنید
                    </div>
            }
        </div>
    )
}

function CreateCommentForm({ onClose }) {
    const formik = useFormik({
        initialValues: { comment: "", star: 0 },
        validationSchema: Yup.object({
            comment: Yup.string().required("نظر خود را بنویسید")
        })
    })
    return (
        <form>
            <div className="flex items-center justify-center w-full pb-4 gap-1">
                {Array(5).fill({}).map((item, index) => (
                    <div onClick={() => formik.setFieldValue("star", index + 1)} key={index} className={`cursor-pointer ${index < formik.values.star ? "text-yellow-500" : "text-slate-400"}`}>
                        <FaStar className='w-5 h-5' />
                    </div>
                ))}
            </div>
            <TextArea
                formik={formik}
                label={'نظر'}
                name={'comment'}
            />
            <div className='pt-4 flex items-center gap-4'>
                <button className='!w-full btn btn--primary'>
                    ثبت
                </button>
                <button type='button' onClick={onClose} className='!w-full btn btn--outline'>
                    لغو
                </button>
            </div>
        </form>
    )
}