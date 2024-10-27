import { useFormik } from "formik";
import CourseFields from "./CourseFields";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addNewAcademy } from "@/services/academyService";
import { useMutation } from "@tanstack/react-query";

const initialValues = {
    title: "",
    entitle: "",
    slug: "",
    sku: "",
    expiredate: "",
    status: "",
    price: "",
    anbar: "",
    discount_price: "",
    description: "",
    shortdescription: "",
    brand_id: "",
    meta_title: "",
    meta_desc: "",
    meta_keywords: "",
    photo_id: [],
    categories: [],
    files: []
};
const validationSchema = Yup.object({
    title: Yup.string().required("عنوان را وارد کنید"),
    entitle: Yup.string().required("عنوان انگلیسی را وارد کنید").matches(/^[A-Za-z0-9]+$/, "فقط حروف انگلیسی وارد کنید"),
    slug: Yup.string().required("اسلاگ را وارد کنید"),
    sku: Yup.string().required("کد دوره را وارد کنید").matches(/^[A-Za-z0-9]+$/, "فقط حروف انگلیسی وارد کنید"),
    expiredate: Yup.string().required("مهلت ثبت‌نام را تعیین کنید"),
    status: Yup.string().required("وضعیت دوره را مشخص کنید"),
    price: Yup.number().required("قیمت را وارد کنید"),
    discount_price: Yup.number().required("کد تخفیف را وارد کنید").max(100, "حداکثر درصد تخفیف نمیتواند بیشتر از 100 باشد"),
    anbar: Yup.number().required("تعداد موجودی را وارد کنید"),
    description: Yup.string().required("توضیحات را وارد کنید"),
    shortdescription: Yup.string().required("توضیحات کامل را وارد کنید"),
    meta_title: Yup.string().required("عنوان متا را وارد کنید"),
    meta_desc: Yup.string().required("توضیحات متا را وارد کنید"),
    meta_keywords: Yup.string().required("تگ های متا را وارد کنید"),
    categories: Yup.array().min(1, "دسته بندی را انتخاب کنید"),
    files: Yup.array().required("تصویر را انتخاب کنید").min(1, "تصویر را انتخاب کنید")
})

export default function CreateCourseForm() {

    const { mutateAsync, isPending } = useMutation({ mutationFn: addNewAcademy });
    const router = useRouter();

    const onSubmit = async (values) => {
        const transformCategories = formik.values.categories.map((item) => item.value).join(",");
        const transformPhotoId = formik.values.photo_id.join(",");

        const productData = {
            title: values.title,
            entitle: values.entitle,
            slug: values.slug,
            sku: values.sku,
            expiredate: values.expiredate,
            status: values.status,
            price: values.price,
            anbar: values.anbar,
            discount_price: values.discount_price,
            description: values.description,
            shortdescription: values.shortdescription,
            meta_title: values.meta_title,
            meta_desc: values.meta_desc,
            meta_keywords: values.meta_keywords,
            photo_id: transformPhotoId,
            categories: transformCategories,
        }

        const formData = new FormData();

        for (const key in productData) {
            formData.append(key, productData[key]);
        }

        try {
            const { data } = await mutateAsync(formData);
            if (data) {
                toast.success("دوره آموزشی با موفقیت ثبت شد");
                router.replace("/admin/academy");
            }

        } catch (error) {
            if (error?.response?.data?.message.some((e) => e === "The title has already been taken.")) {
                toast.error("دوره ای با این عنوان قبلا ثبت شده");
                return;
            }

            if (error?.response?.data?.message.some((e) => e === "The sku has already been taken.")) {
                toast.error("این کد دوره قبلا ثبت شده");
                return;
            }

            if (error?.response?.status === 401) {
                window.location.reload();
                return;
            }

            toast.error("خطایی رخ داده است!");
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });


    return (
        <div>
            <div className="flex flex-col gap-1 items-center border-b border-slate-300 pb-4 mb-5">
                <h1 className="font-semibold text-slate-800">
                    افزودن دوره جدید
                </h1>
                <p className="text-sm text-slate-500">
                    اطلاعات دوره آموزشی را وارد کنید
                </p>
            </div>

            <CourseFields formik={formik} loading={isPending} />
        </div>
    )
}
