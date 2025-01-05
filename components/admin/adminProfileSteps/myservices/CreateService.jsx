import { useFormik } from "formik";
import ServiceFields from "./ServiceFields";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewService } from "@/services/expertApi/specialistServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";


const validationSchema = Yup.object({
    type: Yup.string().required("نوع خدمت را انتخاب کنید"),
    // dedicated_time: Yup.string().required("بازه زمانی خدمت را انتخاب کنید"),
    price_type: Yup.string().required("نوع هزینه را انتخاب کنید"),
    activity_time: Yup.array().required("زمان فعالیت را انتخاب کنید").min(1, "زمان فعالیت را انتخاب کنید"),
    price: Yup.string().when("price_type", {
        is: (value) => value === 'custom',
        then: (schema) => schema.required('قیمت دلخواه را وارد کنید').matches(/^[\d,]+$/, "قیمت باید فقط شامل اعداد باشد"),
        otherwise: (schema) => schema,
    }),
});

export default function CreateService() {
    const { mutateAsync, isPending } = useMutation({ mutationFn: addNewService });
    const router = useRouter();

    const createServiceHandler = async (values) => {

        const activityTimeJson1 = values.activity_time.map(item => {
            const { day, ...rest } = item;
            return JSON.stringify({ week: day, ...rest });
        }).join(', ').replace(/"([^"]+)":/g, '$1:');


        const activityTimeJson2 = values.activity_time.map(item => {
            const { day, ...rest } = item;
            return { week: day, ...rest };
        });

        try {
            const { data } = await mutateAsync({
                type: values.type,
                dedicated_time: JSON.stringify(values.dedicated_time),
                price_type: values.price_type,
                price: values.price,
                activity_time: JSON.stringify(activityTimeJson2),
                description: values.description
            })
            if (data) {
                toast.success("خدمت جدید اضافه شد");
                router.replace("/admin/services");
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
        initialValues: {
            type: "",
            dedicated_time: [],
            price_type: "",
            price: "0",
            activity_time: [],
            description: ""
        },
        onSubmit: createServiceHandler,
        validationSchema
    });

    return (
        <div className='w-full mx-auto md:max-w-screen-sm flex flex-col items-center gap-10'>
            <div className="w-full flex items-center gap-2 py-4 border-b-2 border-slate-300 dark:border-slate-400">
                <button onClick={() => window.history.back()} className="text-slate-600 btn btn--secondary !p-2">
                    <FaArrowRightLong className="w-5 h-5" />
                </button>
                <div className='flex flex-col justify-center itemscenter gap-1'>
                    <h1 className='text-lg text-slate-800 font-bold'>خدمت جدید</h1>
                    <p className='text-xs text-slate-600'>لطفا خدماتی را که می توانید در پروفایل خود ارائه دهید ثبت کنید.</p>
                </div>
            </div>

            <ServiceFields formik={formik} isPending={isPending} />
        </div>
    )
}
