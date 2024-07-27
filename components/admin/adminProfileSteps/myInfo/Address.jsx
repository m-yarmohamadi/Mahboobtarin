import Input from "@/tools/Input";
import Select from "@/tools/Select";

export default function Address({formik}) {
    return (
        <>
            <Select
                label="ملیت"
                options={[]}
            />

            <Select
                label="کشور محل سکونت"
                options={[]}
            />

            <Select
                label="استان محل سکونت"
                options={[]}
            />

            <Select
                label="شهر محل سکونت"
                options={[]}
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
