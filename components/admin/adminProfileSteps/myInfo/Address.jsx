import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { Countries } from '@/data/countries';
import { useGetCity, useGetProvinces } from "@/hooks/useCity";

export default function Address({ formik }) {
    const {transformProvinces} = useGetProvinces();
	const {transformCity} = useGetCity(formik.values.province_id);
    const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));

    return (
        <>
            <Select
                label="کشور محل سکونت"
                name="country"
                formik={formik}
                options={sortedCountries}
            />

            <Select
                label="استان محل سکونت"
                name="province_id"
                formik={formik}
                options={transformProvinces || []}
            />

            <Select
                label="شهر محل سکونت"
                name="city_id"
                formik={formik}
                options={transformCity || []}
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
