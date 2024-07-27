import Input from "@/tools/Input";
import Select from "@/tools/Select";

export default function Address({ formik }) {
    return (
        <>
            <Input
                label="کشور محل سکونت"
                name="country"
                formik={formik}
            />

            <Input
                label="استان محل سکونت"
                name="province_id"
                formik={formik}
            />

            <Input
                label="شهر محل سکونت"
                name="city_id"
                formik={formik}
            />

            <div className='lg:col-span-2'>
                <Input
                    label="آدرس محل سکونت"
                    name="address"
                    formik={formik}
                />
            </div>
        </>
    )
}
