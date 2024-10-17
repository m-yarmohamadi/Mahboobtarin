import useMainPage from "@/hooks/useMainPage";
import { addNewRequest } from "@/services/expertDashboardService";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import Select from "@/tools/Select";
import TextArea from "@/tools/TextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import * as Yup from "yup";

export default function CreateCallingForm() {
    const { categories, isLoading } = useMainPage();
    const transformedCategory = !isLoading && categories.map((item) => ({ value: item.id, label: item.name }));
    const { mutateAsync: mutateAddRequest, isPending } = useMutation({ mutationFn: addNewRequest });
    const queryClient = useQueryClient();
    const router = useRouter();

    const addRequestHandler = async (values) => {
        try {
            const formData = new FormData();
            for (let i in values) {
                formData.append(i, values[i]);
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
        initialValues: { title: "", category: "", picture: "", description: "" },
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
            <div className="w-full max-w-[50%] border border-dashed border-slate-300 dark:border-slate-400 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-10">
                    {
                        formik.values.picture ?
                            <img src={URL.createObjectURL(formik.values.picture)} alt="" className="w-full h-full object-cover object-center" />
                            :
                            <div className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4">
                                <FaImage className="w-8 h-8 text-primary-01 opacity-50" />
                            </div>
                    }
                </div>
                <input
                    type="file"
                    name="select-calling-img"
                    id="select-calling-img"
                    hidden
                    accept="image/*"
                    onChange={({ target }) => formik.setFieldValue("picture", target.files[0])}
                />
                <label htmlFor="select-calling-img" className="btn btn--secondary !w-full !rounded-t-none">
                    افزودن تصویر
                </label>
            </div>
            <div className="text-xs text-error pb-6 pt-1">
                {formik.touched.picture && formik.errors.picture}
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row">
                <Input
                    label="عنوان فراخوان"
                    name={'title'}
                    formik={formik}
                />
                <Select
                    label="دسته بندی"
                    name={'category'}
                    formik={formik}
                    options={!isLoading ? [{ value: "", label: "دسته بندی را انتخاب کنید" }, ...transformedCategory] : [{ value: "", label: "دسته بندی را انتخاب کنید" }]}
                />
            </div>
            <TextArea
                label={'توضیحات'}
                name={'description'}
                formik={formik}
            />
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
