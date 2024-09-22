import ProductFields from "./ProductFields";

export default function CreateProductForm() {
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

            <ProductFields />
        </div>
    )
}
