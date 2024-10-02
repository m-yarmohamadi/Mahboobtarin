import { useFormik } from "formik";
import ServiceFields from "./ServiceFields";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewService } from "@/services/expertDashboardService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";


const validationSchema = Yup.object({
    type: Yup.string().required("نوع خدمت را انتخاب کنید"),
    // dedicated_time: Yup.string().required("بازه زمانی خدمت را انتخاب کنید"),
    price_type: Yup.string().required("نوع هزینه را انتخاب کنید"),
    price: Yup.number().when("price_type", {
        is: (value) => value === 'custom',
        then: (schema) => schema.required('قیمت دلخواه را وارد کنید'),
        otherwise: (schema) => schema,
    }),
});

export default function CreateService() {
    const { mutateAsync, isPending } = useMutation({ mutationFn: addNewService });
    const router = useRouter();

    const createServiceHandler = async (values) => {
        const activityTimeJson = values.activity_time.map(item => {
            const { day, ...rest } = item;
            return JSON.stringify({ week: day, ...rest });
        }).join(', ').replace(/"([^"]+)":/g, '$1:');

        console.log(activityTimeJson);
        

        try {
            const { data } = await mutateAsync({
                type: values.type,
                dedicated_time: "null",
                price_type: values.price_type,
                price: values.price,
                activity_time: activityTimeJson,
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
            dedicated_time: "",
            price_type: "",
            price: 0,
            activity_time: [],
        },
        onSubmit: createServiceHandler,
        validationSchema
    });

    return (
        <div className='w-full mx-auto md:max-w-screen-sm flex flex-col items-center gap-10'>
            <div className="w-full flex items-center gap-2 py-4 border-b-2 border-slate-300">
                <button onClick={() => window.history.back()} className="text-gray-600 btn btn--secondary !p-2">
                    <FaArrowRightLong className="w-5 h-5" />
                </button>
                <div className='flex flex-col justify-center itemscenter gap-1'>
                    <h1 className='text-lg text-gray-800 font-bold'>خدمت جدید</h1>
                    <p className='text-xs text-gray-600'>لطفا خدماتی را که می توانید در پروفایل خود ارائه دهید ثبت کنید.</p>
                </div>
            </div>

            <ServiceFields formik={formik} isPending={isPending} />
        </div>
    )
}
