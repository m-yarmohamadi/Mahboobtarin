import { useFormik } from "formik";
import ServiceFields from "./ServiceFields";

export default function CreateService() {
    const formik = useFormik({
        initialValues:{
            title:"",
            dateTime:[],
            timeFrame:"",
            priceType:"",
            priceType:""
        }
    });

    return (
        <div className='w-full mx-auto md:max-w-screen-sm flex flex-col items-center gap-10'>
            <div className='w-full flex flex-col justify-center items-center gap-3 py-4 border-b-2 border-slate-300'>
                <h1 className='text-lg text-gray-800 font-bold'>خدمت جدید</h1>
                <p className='text-sm text-gray-600'>لطفا خدماتی را که می توانید در پروفایل خود ارائه دهید ثبت کنید.</p>
            </div>

            <ServiceFields formik={formik}/>
        </div>
    )
}
