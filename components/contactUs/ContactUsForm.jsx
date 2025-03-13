import { sendMsgContactUsApi } from "@/services/mainPageService";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import TextArea from "@/tools/TextArea";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";


const validationSchema = Yup.object({
    contactname: Yup.string().required('وارد کردن نام اجباری است'),
    subject: Yup.string().required('وارد کردن موضوع اجباری است'),
    contactemail: Yup.string().required('وارد کردن ایمیل اجباری است').email("ایمیل وارد شده معتبر نیست"),
    contactphone: Yup.string().required('وارد کردن شماره موبایل اجباری است').matches(/^(09)\d{9}$/, "شماره موبایل وارد شده نادرست است"),
    contactmessage: Yup.string().required('وارد کردن پیام اجباری است'),
});

export default function ContactUsForm() {
    const { mutateAsync, isPending } = useMutation({ mutationFn: sendMsgContactUsApi });
    const onSubmit = async (values, { resetForm }) => {
        try {
            const data = await mutateAsync(values);
            toast.success(data.message[0]);
            resetForm();
        } catch (error) {

        }
    }

    const formik = useFormik({
        initialValues: { contactname: '', contactemail: '', contactphone: '', subject: '', contactmessage: '' },
        onSubmit,
        validationSchema,
    })

    return (
        <form onSubmit={formik.handleSubmit} className="w-full container md:w-1/2 flex flex-col mx-auto items-center mb-16">
            <div className="text-2xl font-bold text-primary-01 mb-4">
                ارتباط با ما
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    name={'contactname'}
                    label={'نام شما'}
                    type={'text'}
                    formik={formik}
                />
                <Input
                    name={'subject'}
                    label={'موضوع'}
                    type={'text'}
                    formik={formik}
                />
                <Input
                    name={'contactemail'}
                    label={'ایمیل'}
                    type={'text'}
                    formik={formik}
                />
                <Input
                    name={'contactphone'}
                    label={'شماره موبایل'}
                    type={'text'}
                    formik={formik}
                />
                <div className="md:col-span-2">
                    <TextArea
                        name={'contactmessage'}
                        label={'پیام شما'}
                        type={'text'}
                        formik={formik}
                    />
                </div>
            </div>
            <button className="!w-full btn btn--primary mt-4" type="submit">
                {isPending ? <Loading /> : 'ارسال پیام'}
            </button>
        </form>
    )
}
