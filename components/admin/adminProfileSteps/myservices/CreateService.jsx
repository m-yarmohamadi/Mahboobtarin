import { useFormik } from "formik";
import ServiceFields from "./ServiceFields";

export default function CreateService() {
    const formik = useFormik({
        initialValues:{
            title:"",
            date:"",
            time:"",
            timeFrame:"",
            priceType:"",
            priceType:""
        }
    });

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-col justify-center items-center gap-3 py-4'>
                <h1 className='text-lg text-gray-800 font-bold'>خدمت جدید</h1>
                <p className='text-sm text-gray-600'>لطفا خدماتی را که می توانید در پروفایل خود ارائه دهید ثبت کنید.</p>
            </div>

            <ServiceFields formik={formik}/>
        </div>
    )
}
