import { addCommentExpertise, getCommentExpertise } from "@/services/expertDashboardService";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import ViewMore from "./ViewMore";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Comments({ motekhases_id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getComments() {
            try {
                const { data } = await getCommentExpertise(motekhases_id);
                setComments(data);
            } catch (error) {
                setComments([]);
            }
        }

        getComments();
    }, [])

    return (
        <div className="pb-4 border border-slate-400 rounded-lg w-full ">
            <CreateCommentForm motekhases_id={motekhases_id} />
            <div className="p-4 w-full">
                {comments.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="w-full border-b border-b-slate-300 py-6 last:border-b-0 flex flex-col justify-center items-start gap-1"
                        >
                            <span className="font-bold text-sm text-slate-800">
                                {item.user.name} {item.user.lastname}
                            </span>
                            <div className="w-full flex justify-between mb-4 items-center gap-4 text-slate-500 text-sm">
                                <span className="flex justify-start items-center gap-1 text-primary-01">
                                    {Array(item.star).fill({}).map((item, index) => (
                                        <FaStar key={index} />
                                    ))}
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <MdAccessTime className="w-4 h-4" />
                                    {/* {enToFaNumber(`${item.time}`)} */}
                                </span>
                            </div>
                            <span className="text-slate-600 text-xs font-thin">
                                {item.text}
                            </span>
                        </div>
                    );
                })}
            </div>
            {/* <ViewMore /> */}
        </div>
    )
}

function CreateCommentForm({ motekhases_id }) {
    const { mutateAsync, isPending } = useMutation({ mutationFn: addCommentExpertise });
    const router = useRouter();

    const onSubmit = async (values, { resetForm }) => {
        try {
            const { data } = await mutateAsync({ motekhases_id, ...values });
            if (data) {
                toast.success("نظر شما ثبت شد");
                resetForm();
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                toast.error("ابتدا وارد حساب کاربری خود شوید");
                router.push("/auth")
                return
            }

            toast.error("خطایی رخ داده است");
        }
    }

    const formik = useFormik({
        initialValues: { star: 0, text: "" },
        onSubmit,
        validationSchema: Yup.object({
            text: Yup.string().required("نظر خود را بنویسید")
        })
    });

    return (
        <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className=" flex flex-col items-center gap-4 w-full  p-4">
                <span className="text-sm font-semibold text-slate-800">
                    به این صاحب این صفحه چه امتیازی می دهید؟
                </span>
                <div className="flex items-center gap-3">
                    {Array(5).fill({}).map((item, index) => (
                        <div onClick={() => formik.setFieldValue("star", index + 1)} key={index} className={`cursor-pointer ${index < formik.values.star ? "text-slate-800" : "text-slate-300"}`}>
                            <FaStar />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="p-4">
                    <label htmlFor="Opinion"></label>
                    <textarea
                        rows="8"
                        className=" w-full bg-slate-200 text-sm  outline-none focus:ring-0 border border-slate-300 rounded-md p-2"
                        placeholder="لطفا نظر خود را درج فرمایید..."
                        required
                        name="text"
                        value={formik.values.text}
                        onChange={formik.handleChange}
                    ></textarea>
                    {formik.errors.text && formik.touched.text &&
                        <span className="text-xs text-error inline-block">
                            {formik.errors.text}
                        </span>
                    }
                    <div className="flex justify-end items-center">
                        <button
                            className=" bg-primary-01 px-8 text-white font-bold py-2 rounded-md"
                            type="submit"
                        >
                            {!isPending ? "ثبت" : <Loading />}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}