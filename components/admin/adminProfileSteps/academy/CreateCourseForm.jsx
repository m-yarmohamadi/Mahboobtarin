import { useFormik } from "formik";
import CourseFields from "./CourseFields";

export default function CreateCourseForm() {

    const formik = useFormik({
        initialValues: { cover: "", lessons: [] }
    })

    return (
        <div>
            <div className="flex flex-col gap-1 items-center border-b border-slate-300 pb-4 mb-5">
                <h1 className="font-semibold text-gray-800">
                    افزودن دوره جدید
                </h1>
                <p className="text-sm text-gray-500">
                    اطلاعات دوره آموزشی را وارد کنید
                </p>
            </div>

            <CourseFields formik={formik} />
        </div>
    )
}
