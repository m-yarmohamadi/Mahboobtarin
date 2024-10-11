import { useFormik } from "formik";
import ProductFields from "./ProductFields";

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
    photo_id: "",
    categories: "",
};
const validationSchema = {}


export default function CreateProductForm() {
    const formik = useFormik({
        initialValues,
        validationSchema
    });
    return (
        <div>
            <div className="flex flex-col gap-1 items-center">
                <h1 className="font-semibold text-gray-800">
                    افزودن محصول جدید
                </h1>
                <p className="text-sm text-gray-500">
                    اطلاعات محصول خود را وارد کنید
                </p>
            </div>

            <ProductFields formik={formik}/>
        </div>
    )
}
