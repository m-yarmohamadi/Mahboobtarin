import CheckBoxInput from "@/components/CheckBoxInput"
import { useDashboardSettings } from "@/hooks/useProfile"
import { updateDashboardSettings } from "@/services/authService"
import Loading from "@/tools/Loading"
import MultiSelect from "@/tools/MultiSelect"
import Select from "@/tools/Select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import * as Yup from "yup";
import LoadingAdmin from "../../LoadingAdmin"

const fonts = [
    { value: "Vazir", label: "وزیر" },
    { value: "Vazirmatn", label: "وزیر متن" },
    { value: "IRANSans", label: "ایران سنس" }
]

const modes = [
    { value: "light", label: "حالت روشن" },
    { value: "dark", label: "حالت تیره" }
]

const notifications = [
    { value: "sms", label: "پیامک" },
    { value: "email", label: "ایمیل" },
    { value: "notification", label: "نوتیفیکیشن" }
]

export default function SettingsOptions() {
    const { mutateAsync, isPending } = useMutation({ mutationFn: updateDashboardSettings });
    const queryClient = useQueryClient();
    const { settings, isLoading } = useDashboardSettings();

    const onSubmit = async (values) => {
        const notifTypeToString = values.notification_type.map(item => item.value).join(',');

        try {
            const { data } = await mutateAsync({ ...values, notification_type: notifTypeToString });
            toast.success("تنظیمات ویرایش شد");
            queryClient.invalidateQueries({ queryKey: ["get-dashboard-settings"] });
        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
                return
            }
        }
    }

    const formik = useFormik({
        initialValues: { font: "IRANSans", theme: "light", notification_type: [], notification_sound: false, notification_vibration: false, notification_farakhan: false },
        onSubmit,
        validationSchema: Yup.object({
            notification_type: Yup.array().min(1, "حداقل یک نوع روش اطلاع رسانی را انتخاب نمایید")
        })
    })


    useEffect(() => {
        if (!isLoading && settings) {
            const notificationsTypeArray = settings.notification_type
                ? settings.notification_type.split(',').map(value => {
                    return { value, label: getLabel(value) };
                })
                : [{ value: "sms", label: "پیامک" }];

            function getLabel(value) {
                switch (value) {
                    case 'sms':
                        return 'پیامک';
                    case 'email':
                        return 'ایمیل';
                    case 'notification':
                        return 'نوتیفیکیشن';
                    default:
                        return '';
                }
            }

            formik.setFieldValue("font", settings.font || "IRANSans");
            document.documentElement.style.setProperty('--font-primary', settings.font);

            formik.setFieldValue("theme", settings.theme || "light");
            if (settings.theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            formik.setFieldValue("notification_type", notificationsTypeArray);
            formik.setFieldValue("notification_vibration", settings.notification_vibration === "1" ? true : false);
            formik.setFieldValue("notification_sound", settings.notification_sound === "1" ? true : false);
            formik.setFieldValue("notification_farakhan", settings.notification_farakhan === "1" ? true : false)
        }
    }, [isLoading, settings])

    if (isLoading) return <LoadingAdmin />

    return (
        <form onSubmit={formik.handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
                label={'نوع فونت'}
                options={fonts}
                name={'font'}
                formik={formik}
            />
            <Select
                label={'ظاهر برنامه'}
                options={modes}
                name={'theme'}
                formik={formik}
            />
            <MultiSelect
                key={formik.values.notification_type.length}
                label={'نوع اطلاع رسانی'}
                options={notifications}
                placeholder={'بدون اطلاع رسانی'}
                value={formik.values.notification_type}
                onChange={(e) => formik.setFieldValue("notification_type", e)}
                formik={formik}
                name={'notification_type'}
            />
            <div className="md:col-span-2 flex flex-col gap-6">
                <CheckBoxInput
                    label={'پخش صدای نوتیفکیشن'}
                    name={'notification_sound'}
                    formik={formik}
                />
                <CheckBoxInput
                    label={'لرزش هنگام دریافت نوتیفکیشن'}
                    name={'notification_vibration'}
                    formik={formik}
                />
                <CheckBoxInput
                    label={'مایل به دریافت فراخوان هستم'}
                    name={'notification_farakhan'}
                    formik={formik}
                />
            </div>

            <div className="md:col-span-2 pt-5">
                <button type="submit" className="btn btn--primary !w-full sm:!w-1/5">
                    {isPending ? <Loading /> : "ذخیره"}
                </button>
            </div>
        </form>
    )
}
