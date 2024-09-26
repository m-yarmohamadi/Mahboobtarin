import Input from "@/tools/Input";
import Select from "@/tools/Select";
import TextArea from "@/tools/TextArea";
import { useFormik } from "formik";
import { FaImage } from "react-icons/fa6";

export default function CreateCallingForm() {

    const formik = useFormik({
        initialValues: { title: "", category: "", pic: "", desc: "" }
    });

    return (
        <form>
            <div className="w-full mb-6 max-w-[50%] border border-dashed border-slate-300 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-10">
                    {
                        formik.values.pic ?
                            <img src={URL.createObjectURL(formik.values.pic)} alt="" className="w-full h-full object-cover object-center" />
                            :
                            <div className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4">
                                <FaImage className="w-8 h-8 text-primary-01/50" />
                            </div>
                    }
                </div>
                <input
                    type="file"
                    name="select-calling-img"
                    id="select-calling-img"
                    hidden
                    accept="image/*"
                    onChange={({ target }) => formik.setFieldValue("pic", target.files[0])}
                />
                <label htmlFor="select-calling-img" className="btn btn--secondary !w-full !rounded-t-none">
                    افزودن تصویر
                </label>
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row">
                <Input
                    label="عنوان فراخوان"
                />
                <Select
                    label="دسته بندی"
                    options={[]}
                />
            </div>
            <TextArea
                label={'توضیحات'}
            />
            <div className="w-full grid grid-cols-2 gap-4 pt-8 sm:max-w-[50%]">
                <button type="submit" className="btn btn--primary">
                    ثبت
                </button>
                <button type="button" onClick={() => window.history.back()} className="btn btn--outline">
                    لغو
                </button>
            </div>
        </form>
    )
}
