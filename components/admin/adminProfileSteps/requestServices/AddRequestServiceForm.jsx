import MultiSelect from "@/tools/MultiSelect";
import Select from "@/tools/Select";
import { FaArrowRightLong } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addRequestService } from "@/services/expertApi/requestExpertService";
import toast from "react-hot-toast";
import Loading from "@/tools/Loading";
import { useRouter } from "next/navigation";
import TextArea from "@/tools/TextArea";


const serviceTypes = [
    { value: "تولید محتوای صوتی", label: "تولید محتوای صوتی" },
    { value: "تولید محتوای تصویری و گرافیکی", label: "تولید محتوای تصویری و گرافیکی" },
    { value: "تولید محتوای ویدیویی", label: "تولید محتوای ویدیویی" },
    { value: "تبلیغات", label: "تبلیغات" },
    { value: "برگزاری دوره و مراسمات", label: "برگزاری دوره و مراسمات" },
]

const types = [
    { value: "تیزر", label: "تیزر" },
    { value: "گقتگو و مصاحبه", label: "گقتگو و مصاحبه" },
    { value: "مستند", label: "مستند" },
    { value: "فیلم کوتاه", label: "فیلم کوتاه" },
]

const targets = [
    { value: "تبلیغات", label: "تبلیغات" },
    { value: "آموزش", label: "آموزش" },
    { value: "سرگرمی", label: "سرگرمی" },
    { value: "سایر", label: "سایر" },
]

export default function AddRequestServiceForm() {
    const { mutateAsync, isPending } = useMutation({ mutationFn: addRequestService });
    const router = useRouter();

    const onSubmit = async (values) => {
        try {
            const { data } = await mutateAsync(values);
            router.replace("/admin/request_services");
            toast.success("درخواست شما ثبت شد")
        } catch (error) {
            if (error?.response?.status === 401) {
                toast.error("لطفا وارد حساب کاربری خود شوید");
                window.location.reload();
            } else {
                toast.error("خطایی رخ داده است");
            }
        }
    }

    const formik = useFormik({
        initialValues: { service: "", theme: "", target: "", description: "" },
        onSubmit,
        validationSchema: Yup.object({
            service: Yup.string("").required("نوع خدمت را انتخاب کنید"),
            theme: Yup.string("").required("سبک را انتخاب کنید"),
            description : Yup.string("").required("توضیحات را وارد کنید"),
            target: Yup.string("").required("هدف را انتخاب کنید")
        })
    })

    return (
        <form onSubmit={formik.handleSubmit} className='w-full flex flex-col items-center gap-10'>
            <div className="w-full flex items-center gap-2 py-4 border-b-2 border-slate-300 dark:border-slate-400">
                <button onClick={() => window.history.back()} className="text-slate-600 btn btn--secondary !p-2">
                    <FaArrowRightLong className="w-5 h-5" />
                </button>
                <div className='flex flex-col justify-center itemscenter gap-1'>
                    <h1 className='text-lg text-slate-800 font-bold'>درخواست خدمت جدید</h1>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Select
                    label='نوع خدمت'
                    options={[{ label: 'یک گزینه را انتخاب کنید', value: '' }, ...serviceTypes]}
                    name={'service'}
                    formik={formik}
                />
                {/* <Select
                    label='سبک'
                    options={[{ label: 'یک گزینه را انتخاب کنید', value: '' }, ...types]}
                    name={'theme'}
                    formik={formik}
                /> */}
                <Select
                    label='هدف'
                    options={[{ label: 'یک گزینه را انتخاب کنید', value: '' }, ...targets]}
                    name={'target'}
                    formik={formik}
                />
                {/* <MultiSelect
                    label={'هدف'}
                    placeholder="هدف"
                    options={targets}
                    value={formik.values.target}
                    onChange={(e) => formik.setFieldValue("target", e)}
                    name={'target'}
                    formik={formik}
                /> */}
                <TextArea
                    label={'توضیحات'}
                    name={'description'}
                    formik={formik}
                />
            </div>

            <div className="w-full flex items-center gap-2 mt-10 pt-3 border-t border-slate-300">
                <button type="submit" className="!w-full lg:!w-1/2 !text-base !font-bold btn btn--primary">
                    {isPending ? <Loading /> : "ثبت"}
                </button>
            </div>
        </form>
    )
}
