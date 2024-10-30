import CheckBoxInput from "@/components/CheckBoxInput"
import Select from "@/tools/Select"
import { useEffect, useState } from "react"

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
    { value: "", label: "غیرفعال" },
    { value: "sms", label: "پیامک" },
    { value: "email", label: "ایمیل" },
    { value: "notif", label: "نوتیفیکیشن" }
]

const typeNotif = [
    { value: "", label: "غیرفعال" },
    { value: "withSonud", label: "پخش صدای نوتیفکیشن" },
    { value: "withVibrate", label: "لرزش هنگام دریافت نوتیفکیشن" },
]

export default function SettingsOptions() {
    const [font, setFont] = useState("IRANSans")
    
    useEffect(()=>{
        document.documentElement.style.setProperty('--font-primary', font);
    },[font])

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
                label={'نوع فونت'}
                options={fonts}
                value={font}
                onChange={(e)=>setFont(e.target.value)}
            />
            <Select
                label={'ظاهر برنامه'}
                options={modes}
            />
            <Select
                label={'نوع اطلاع رسانی'}
                options={notifications}
            />
            <Select
                label={'سبک اعلان'}
                options={typeNotif}
            />
            <div className="md:col-span-2">
                <CheckBoxInput label={'مایل به دریافت فراخوان هستم'} name={'isGetRequests'} />
            </div>

            <div className="md:col-span-2 pt-5">
                <button className="btn btn--primary !w-full sm:!w-1/5">
                    ذخیره
                </button>
            </div>
        </div>
    )
}
