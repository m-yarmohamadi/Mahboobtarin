import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { Countries } from '@/data/countries';
import { useGetCity, useGetProvinces } from "@/hooks/useCity";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Map from "@/components/mapComponent/Map";

export default function Address({ formik, isLoading }) {
    const { transformProvinces } = useGetProvinces();
    const { transformCity } = useGetCity(formik.values.province_id);
    const sortedCountries = [...Countries].sort((a, b) => a.label.localeCompare(b.label, 'fa'));
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (!firstLoad) {
            formik.setFieldValue("province_id", "");
            formik.setFieldValue("city_id", "");
        }
    }, [formik.values.country])

    return (
        <>
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-4 lg:col-span-2">
                <Input
                    label="ملیت"
                    formik={formik}
                    name="nationality"
                    disabled={true}
                />


                <Select
                    label="کشور محل سکونت"
                    name="country"
                    formik={formik}
                    onClickSelect={() => setFirstLoad(false)}
                    options={sortedCountries}
                />

                {
                    formik.values.country === "Iran" ?

                        <>
                            <Select
                                label="استان/ایالت محل سکونت"
                                name="province_id"
                                formik={formik}
                                options={[{ id: -1, value: "", label: "استان محل سکونت را انتخاب کنید" }, ...transformProvinces || []]}
                            />

                            <Select
                                label="شهر محل سکونت"
                                name="city_id"
                                formik={formik}
                                options={[{ id: -1, value: "", label: "شهر محل سکونت را انتخاب کنید" }, ...transformCity || []]}
                                disabled={!formik.values.province_id}
                            />
                        </>
                        :
                        <>
                            <Input
                                label="استان/ایالت محل سکونت"
                                name="province_id"
                                formik={formik}
                            />

                            <Input
                                label="شهر محل سکونت"
                                name="city_id"
                                formik={formik}
                            />
                        </>
                }
            </div>
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
