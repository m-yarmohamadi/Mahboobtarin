import Modal from "@/components/Modal";
import TextArea from "@/tools/TextArea";
import { useFormik } from "formik";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import * as Yup from "yup";

export default function CourseComment() {
    const [addComment, setAddComment] = useState(false);

    return (
        <div className="bg-white px-3 py-6 lg:p-5 rounded-xl w-full">
            <div className="text-lg lg:text-xl font-bold text-primary-01 flex items-center justify-between">
                نظرات
                <div>
                    <button onClick={() => setAddComment(true)} type="button" className="btn btn--primary">
                        افزودن نظر
                    </button>
                    <Modal title={'افزودن نظر جدید'} open={addComment} onClose={() => setAddComment(false)}>
                        <CreateCommentForm onClose={() => setAddComment(false)} />
                    </Modal>
                </div>
            </div>
            <ul className="flex flex-col gap-4 pt-6">
                {Array(4).fill({}).map((comment, index) => (
                    <div
                        key={index}
                        className="w-full bg-slate-100 border border-slate-300 rounded-xl p-4 flex flex-col justify-center items-start gap-1"
                    >
                        <span className="font-bold text-sm text-slate-800">
                            دانشجوی دوره
                        </span>
                        <div className="w-full flex justify-between mb-4 items-center gap-4 text-slate-500 text-sm">
                            <span className="flex justify-start items-center gap-1 text-yellow-500">
                                {Array(3).fill({}).map((item, index) => (
                                    <FaStar key={index} />
                                ))}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-600 flex items-center gap-1">
                                <MdAccessTime className="w-4 h-4" />
                                2 روز قبل
                            </span>
                        </div>
                        <span className="text-slate-700 text-xs leading-6">
                            سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپس
                        </span>
                    </div>
                ))}
            </ul>
        </div>
    )
}


function CreateCommentForm({ onClose }) {
    const formik = useFormik({
        initialValues: { star: 0, text: "" },
        validationSchema: Yup.object({
            text: Yup.string().required("نظر خود را بنویسید")
        })
    });
    return (
        <div>
            <div className=" flex flex-col items-center gap-4 w-full px-4">
                <span className="text-sm font-semibold text-slate-800">
                    به این دوره چه امتیازی می دهید؟
                </span>
                <div className="flex items-center gap-3">
                    {Array(5).fill({}).map((item, index) => (
                        <div onClick={() => formik.setFieldValue("star", index + 1)} key={index} className={`cursor-pointer ${index < formik.values.star ? "text-yellow-500" : "text-slate-400"}`}>
                            <FaStar />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="p-4">
                    <TextArea
                        formik={formik}
                        name={'text'}
                        label={'نظر خود را بنویسید'}
                    />
                    {formik.errors.text && formik.touched.text &&
                        <span className="text-xs text-error inline-block">
                            {formik.errors.text}
                        </span>
                    }
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className=" btn btn--primary"
                            type="submit"
                        >
                            ثبت
                        </button>
                        <button
                            className="btn btn--outline"
                            type="button"
                            onClick={onClose}
                        >
                            لغو
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}