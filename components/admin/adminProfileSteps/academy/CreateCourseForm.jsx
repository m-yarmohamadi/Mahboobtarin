import { useFormik } from "formik";
import CourseFields from "./CourseFields";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addNewAcademy } from "@/services/academyService";
import { useMutation } from "@tanstack/react-query";

const validationSchema = Yup.object({
    title: Yup.string().required("عنوان را وارد کنید"),
    expiredate: Yup.string().required("مهلت ثبت‌نام را تعیین کنید"),
    status: Yup.string().required("وضعیت دوره را مشخص کنید"),
    price: Yup.number().required("قیمت را وارد کنید"),
    discount_price: Yup.number().required("کد تخفیف را وارد کنید").max(100, "حداکثر درصد تخفیف نمیتواند بیشتر از 100 باشد"),
    anbar: Yup.number().required("تعداد موجودی را وارد کنید"),
    description: Yup.string().required("توضیحات را وارد کنید"),
    categories: Yup.array().min(1, "دسته بندی را انتخاب کنید"),
    files: Yup.array().required("تصویر را انتخاب کنید").min(1, "تصویر را انتخاب کنید"),
    place_online: Yup.string().required("نوع برگزاری دوره را انتخاب کنید"),
    video_id: Yup.array().when("place_online", {
        is: (value) => value === 'آنلاین',
        then: (schema) => schema.required("فیلم اموزشی را اپلود کنید").min(1, "فیلم اموزشی را اپلود کنید"),
        otherwise: (schema) => schema,
    }),
})

export default function CreateCourseForm({ editData }) {
    const editCategories = editData && editData.categories.map((item) => ({ value: item.id, label: item.name }));
    const photoId = editData && editData.photos.map((item) => (item.id));
    const photoFiles = editData && editData.photos.map((item) => ({ id: item.id, file: item.path, isEdit: true }));
    const videoId = editData && editData.videos.map((item) => (item.id));
    const videos = editData && editData.videos.map((item) => ({
        id: item.id,
        title: item.title,
        video_type: item.type,
        free_price: item.free_price,
        file: item.path,
        isEdit: true
    }));

    const initialValues = {
        title: editData?.title || "",
        expiredate: editData?.expiredate || "",
        status: editData?.status || "",
        price: editData?.price || "",
        anbar: editData?.anbar || "",
        discount_price: editData?.discount_price || "",
        description: editData?.description || "",
        photo_id: photoId || [],
        video_id: videoId || [],
        categories: editCategories || [],
        files: photoFiles || [],
        videos: videos || [],
        place_online: editData?.place_online || "",
    };

    const { mutateAsync, isPending } = useMutation({ mutationFn: addNewAcademy });
    const router = useRouter();

    const onSubmit = async (values) => {
        const transformCategories = formik.values.categories.map((item) => item.value).join(",");
        const transformPhotoId = formik.values.photo_id.join(",");
        const transformVideoId = formik.values.video_id.join(",");

        const productData = {
            title: values.title,
            expiredate: values.expiredate,
            status: values.status,
            price: values.price,
            anbar: values.anbar,
            discount_price: values.discount_price,
            description: values.description,
            photo_id: transformPhotoId,
            video_id: transformVideoId,
            categories: transformCategories,
            place_online: values.place_online
        }

        const formData = new FormData();

        for (const key in productData) {
            formData.append(key, productData[key]);
        }

        if (editData) {
            formData.append("id", editData.id);
        }

        try {
            const { data } = await mutateAsync(formData);
            if (data) {
                if (editData) {
                    toast.success("دوره آموزشی با موفقیت ویرایش شد");
                } else {
                    toast.success("دوره آموزشی با موفقیت ثبت شد");
                }
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

            if (error?.response?.data?.message.some((e) => e === "The video id field is required.")) {
                toast.error("فیلم های اموزشی را وارد کنید");
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
                    {editData ? "ویرایش دوره" : "افزودن دوره جدید"}
                </h1>
                <p className="text-sm text-slate-500">
                    اطلاعات دوره آموزشی را وارد کنید
                </p>
            </div>

            <CourseFields formik={formik} loading={isPending} btnTxt={editData ? "ویرایش" : "ثبت"} />
        </div>
    )
}
