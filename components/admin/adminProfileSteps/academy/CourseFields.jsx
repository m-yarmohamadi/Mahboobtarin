import Modal from "@/components/Modal";
import Input from "@/tools/Input";
import TextArea from "@/tools/TextArea";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";

export default function CourseFields({ formik }) {
    return (
        <div className="w-full flex flex-col gap-4">
            <CoverImage formik={formik} />
            <Input
                label={'عنوان دوره'}
            />
            <div className="flex items-center gap-4">
                <Input
                    label={'قیمت'}
                />
                <Input
                    label={'میزان تخفیف'}
                />
            </div>
            <TextArea
                label={'توضیحات کوتاه'}
            />
            <TextArea
                label={'توضیحات کامل'}
            />

            <Lessons formik={formik} />
            <div className="w-full grid grid-cols-2 gap-4 pt-4 md:max-w-[50%]">
                <button className="btn btn--primary">
                    ثبت
                </button>
                <button className="btn btn--outline">
                    لغو
                </button>
            </div>
        </div>
    )
}


function CoverImage({ formik }) {
    return (
        <>
            <div className="w-full sm:max-w-[50%] border border-dashed border-slate-300 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-10">
                    {
                        formik.values.cover ?
                            <img src={URL.createObjectURL(formik.values.cover)} alt="" className="w-full h-full object-cover object-center" />
                            :
                            <div className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4">
                                <FaImage className="w-8 h-8 text-primary-01/50" />
                            </div>
                    }
                </div>
                <input
                    type="file"
                    name="select-cover-course-img"
                    id="select-cover-course-img"
                    hidden
                    accept="image/*"
                    onChange={({ target }) => formik.setFieldValue("cover", target.files[0])}
                />
                <label htmlFor="select-cover-course-img" className="btn btn--secondary !w-full !rounded-t-none">
                    افزودن تصویر دوره
                </label>
            </div>
            <div className="text-xs text-error pt-1">
                {formik.touched.cover && formik.errors.cover}
            </div>
        </>
    )
}

function Lessons({ formik }) {
    const [addLesson, setAddLesson] = useState(false);

    return (
        <div className=" bg-white p-4 rounded-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div className="font-bold text-slate-800">
                    لیست جلسات
                </div>
                <button onClick={() => setAddLesson(true)} className="btn btn--outline gap-2 !py-2">
                    افزودن فیلم آموزشی <IoAddCircleOutline className="w-6 h-6" />
                </button>
                <Modal open={addLesson} onClose={() => setAddLesson(false)} title={'افزودن فیلم آموزشی'}>

                </Modal>
            </div>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {Array(5).fill({}).map((item, index) => (
                    <li key={index} className="">
                        <div className='flex flex-col relative bg-slate-100 rounded-xl'>

                            <div className="p-3">
                                <div className='aspect-w-16 aspect-h-9 overflow-hidden'>
                                    <video
                                        controls
                                        className='w-full h-full object-cover object-center rounded-xl'>
                                        <source
                                            // src={data.path}
                                            type='video/mp4'
                                        />
                                    </video>
                                </div>
                            </div>
                            <h3 className='w-full text-sm text-gray-800 font-bold px-4 pb-4'>
                                قسمت اول
                            </h3>
                            <button className='btn btn--danger absolute top-5 left-5 !p-2'>
                                <HiOutlineTrash className='w-5 h-5' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}