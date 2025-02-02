import { sendMessageOrderApi } from "@/services/expertApi/requestsClientService";
import Loading from "@/tools/Loading";
import TextArea from "@/tools/TextArea";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
    message: Yup.string().required("متن پیام را وارد کنید")
})

export default function RequestSendMessageForm({ order_id, onClose }) {
    const { mutateAsync, isPending } = useMutation({ mutationFn: sendMessageOrderApi });
    const router = useRouter();

    const onSubmit = async (values, { resetForm }) => {
        try {
            const { message } = await mutateAsync({ order_id, message: values.message });
            toast.success(message[0]);
            onClose();
            resetForm();
        } catch (error) {
            if (error?.response?.status === 401) {
                toast.error("ابتدا وارد حساب کاربری خود شوید");
                router.push("/auth");
                return;
            }
        }
    }

    const formik = useFormik({
        initialValues: { message: "" },
        onSubmit,
        validationSchema

    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextArea
                label="متن پیام"
                name="message"
                formik={formik}
            />

            <div className="pt-6 w-full grid grid-cols-2 gap-4">
                <button type="submit" className="btn btn--primary">
                    {isPending ? <Loading width={40} /> : "ارسال"}
                </button>
                <button type="button" onClick={onClose} className="btn btn--secondary">
                    لغو
                </button>
            </div>
        </form>
    )
}
