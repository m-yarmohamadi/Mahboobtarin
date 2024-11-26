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
    hamkari:"",
    workingHours:"",
    salary:"",
    payType:"",
    gender:"",
    workHistory:"",
    militaryStatus:"",
    country:"Iran",
    province:"",
    city:"",
    address:"",
    map:[]
}

export default function CreateCallingForm() {
    const { mutateAsync: mutateAddRequest, isPending } = useMutation({ mutationFn: addNewRequest });
    const queryClient = useQueryClient();
    const router = useRouter();

    const addRequestHandler = async (values) => {
        try {
            const categoryLabel = transformCategories.filter((i) => i.value === formik.values.category)[0].label;
            const callingData = { ...values, category: categoryLabel }
            const formData = new FormData();
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
        validationSchema: Yup.object({
            title: Yup.string().required('عنوان را وارد کنید'),
            category: Yup.string().required('دسته بندی را وارد کنید'),
            description: Yup.string().required('توضیحات را وارد کنید'),
            picture: Yup.string().required('تصویر را انتخاب کنید'),
        })
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
