import { addNewRequest } from "@/services/expertApi/callingService";
import Loading from "@/tools/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import CallingFields from "./CallingFields";


const validationSchema = Yup.object({
    title: Yup.string().required('عنوان را وارد کنید'),
    category: Yup.string().required('دسته بندی را وارد کنید'),
    description: Yup.string().required('توضیحات را وارد کنید'),
    collaboration: Yup.string().required('نوع همکاری را انتخاب کنید'),
    time_work: Yup.string(),
    age: Yup.string(),
    insurance: Yup.string().required("بیمه را انتخاب کنید"),
    salary_amount: Yup.string(),
    payment_method: Yup.string().required("نحوه پرداخت را انتخاب کنید"),
    gender: Yup.string().required("جنسیت را انتخاب کنید"),
    work_history: Yup.string().required("سابقه کاری را انتخاب کنید"),
    military_status: Yup.string().required("وضعیت سربازی را انتخاب کنید"),
    status: Yup.string().required("وضعیت فراخوان را انتخاب کنید"),
    country: Yup.string().required("کشور را انتخاب کنید"),
    province: Yup.string().required("استان را انتخاب کنید"),
    city: Yup.string().required('شهر را انتخاب کنید'),
    picture: Yup.array().required('حداقل یک تصویر را انتخاب کنید').min(1, "حداقل یک را انتخاب کنید"),
})

export default function CreateCallingForm({ editData }) {
    const { mutateAsync: mutateAddRequest, isPending } = useMutation({ mutationFn: addNewRequest });
    const queryClient = useQueryClient();
    const router = useRouter();
    const photos = editData ? editData.photos : [];
    const picturesId = photos.map((item) => (item.id));

    const initialValues = {
        title: editData?.title || "",
        category: Number(editData?.category) || "",
        picture: picturesId.length > 0 ? picturesId : [],
        description: editData?.description || "",
        collaboration: editData?.collaboration || "",
        time_work: editData?.time_work || "",
        salary_amount: editData?.salary_amount || "",
        payment_method: editData?.payment_method || "",
        gender: editData?.gender || "",
        age: editData?.age || "",
        insurance: editData?.insurance || "",
        work_history: editData?.work_history || "",
        military_status: editData?.military_status || "",
        country: editData?.country || "Iran",
        province: editData?.province || "",
        city: editData?.city || "",
        address: editData?.address || "",
        status: editData?.status || "",
        map: editData?.lat ? [editData?.lat, editData?.lng] : [],
        files: []
    }

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
                files: null,
                ...values
            }

            for (let i in callingData) {
                formData.append(i, callingData[i]);
            }

            if (editData) {
                formData.append("id", editData.id);
            }

            const { data } = await mutateAddRequest(formData);
            if (data) {
                toast.success(editData ? "فراخوان ویرایش شد" : "فراخوان جدید اضافه شد");
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
        validationSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <CallingFields formik={formik} editPhotos={editData?.photos || []} />
            <div className="w-full grid grid-cols-2 gap-4 pt-8 sm:max-w-[50%]">
                <button type="submit" className="btn btn--primary">
                    {isPending ? <Loading /> : editData ? "ویرایش" : "ثبت"}
                </button>
                <button type="button" onClick={() => window.history.back()} className="btn btn--outline">
                    لغو
                </button>
            </div>
        </form>
    )
}
