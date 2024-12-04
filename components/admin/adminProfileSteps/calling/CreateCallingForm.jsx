import { addNewRequest } from "@/services/expertDashboardService";
import Loading from "@/tools/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import CallingFields from "./CallingFields";


const initialValues = {
    title: "",
    category: "",
    picture: [],
    description: "",
    collaboration: "",
    time_work: "",
    salary_amount: "",
    payment_method: "",
    gender: "",
    age: "",
    insurance: "",
    work_history: "",
    military_status: "",
    country: "Iran",
    province: "",
    city: "",
    address: "",
    map: [],
    files: []
}

const validationSchema = Yup.object({
    title: Yup.string().required('عنوان را وارد کنید'),
    category: Yup.string().required('دسته بندی را وارد کنید'),
    description: Yup.string().required('توضیحات را وارد کنید'),
    collaboration: Yup.string().required('نوع همکاری را انتخاب کنید'),
    time_work: Yup.string().required("ساعت کاری را انتخاب کنید"),
    age: Yup.string().required("سن را وارد کنید"),
    insurance: Yup.string().required("بیمه را انتخاب کنید"),
    salary_amount: Yup.string().required("دستمزد را انتخاب کنید"),
    payment_method: Yup.string().required("نحوه پرداخت را انتخاب کنید"),
    gender: Yup.string().required("جنسیت را انتخاب کنید"),
    work_history: Yup.string().required("سابقه کاری را انتخاب کنید"),
    military_status: Yup.string().required("وضعیت سربازی را انتخاب کنید"),
    country: Yup.string().required("کشور را انتخاب کنید"),
    province: Yup.string().required("استان را انتخاب کنید"),
    city: Yup.string().required('شهر را انتخاب کنید'),
    picture: Yup.array().required('حداقل یک تصویر را انتخاب کنید').min(1, "حداقل یک را انتخاب کنید"),
})

export default function CreateCallingForm() {
    const { mutateAsync: mutateAddRequest, isPending } = useMutation({ mutationFn: addNewRequest });
    const queryClient = useQueryClient();
    const router = useRouter();

    const addRequestHandler = async (values) => {
        try {
            const transformPhotoId = formik.values.picture.join(",");

            const formData = new FormData();

            const callingData = {
                title: values.title,
                subject: values.category,
                lat: values.map[0] || "",
                lng: values.map[1] || "",
                picture: transformPhotoId,
                file:"",
                ...values
            }

            for (let i in callingData) {
                formData.append(i, callingData[i]);
            }

            const { data } = await mutateAddRequest(formData);
            if (data) {
                toast.success("فراخوان جدید اضافه شد");
                router.replace("/admin/calling");
                queryClient.invalidateQueries({ queryKey: ['get-requests'] });
            }

        } catch (error) {
            console.log(error);

            if (error?.response?.status === 401) {
                toast.error("لطفا وارد حساب کاربری خود شوید");
                window.location.reload();
            } else {
                toast.error("خطایی رخ داده است");
            }
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: addRequestHandler,
        validationSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <CallingFields formik={formik} />
            <div className="w-full grid grid-cols-2 gap-4 pt-8 sm:max-w-[50%]">
                <button type="submit" className="btn btn--primary">
                    {isPending ? <Loading /> : "ثبت"}
                </button>
                <button type="button" onClick={() => window.history.back()} className="btn btn--outline">
                    لغو
                </button>
            </div>
        </form>
    )
}
