import Select from "@/tools/Select";
import moment from "jalali-moment";
import { useState } from "react";

export default function DateOfBirth({ formik }) {
    const [birthDay, setBirthDay] = useState(1);
    const [birthMonth, setBirthMonth] = useState(1);
    const [birthYear, setBirthYear] = useState(1300);

    const daysArray = Array.from({ length: 31 }, (_, i) => {
        const day = (i + 1).toString();
        return { id: day, label: day, value: day };
    });

    const monthArray = [
        { id: '1', label: 'فروردین', value: '01' },
        { id: '2', label: 'اردیبهشت', value: '02' },
        { id: '3', label: 'خرداد', value: '03' },
        { id: '4', label: 'تیر', value: '04' },
        { id: '5', label: 'مرداد', value: '05' },
        { id: '6', label: 'شهریور', value: '06' },
        { id: '7', label: 'مهر', value: '07' },
        { id: '8', label: 'آبان', value: '08' },
        { id: '9', label: 'آذر', value: '09' },
        { id: '10', label: 'دی', value: '10' },
        { id: '11', label: 'بهمن', value: '11' },
        { id: '12', label: 'اسفند', value: '12' }
    ];

    const currentYearShamsi = moment(new Date()).locale('fa').format('YYYY');
    const yearsArray = Array.from({ length: Number(currentYearShamsi) - 1300 + 1 }, (_, i) => {
        const year = (1300 + i).toString();
        return { id: year, label: year, value: year };
    });

    return (
        <div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start`}>
            <label
                className='text-sm font-bold px-2'
                htmlFor="birthday">
                تاریخ تولد
            </label>
            <div className='w-full grid grid-cols-3 gap-2 -mt-1'>
                <Select
                    name="birthDay"
                    options={daysArray}
                    value={birthDay}
                    onChange={(e) => {
                        setBirthDay(e.target.value);
                        formik.setFieldValue("birthday", `${birthYear}/${birthMonth}/${e.target.value}`);
                    }}
                />
                <Select
                    name="birthMonth"
                    options={monthArray}
                    value={birthMonth}
                    onChange={(e) => {
                        setBirthMonth(e.target.value);
                        formik.setFieldValue("birthday", `${birthYear}/${e.target.value}/${birthDay}`);
                    }}
                />
                <Select
                    name="birthYear"
                    options={yearsArray}
                    value={birthYear}
                    onChange={(e) => {
                        setBirthYear(e.target.value);
                        formik.setFieldValue("birthday", `${e.target.value}/${birthMonth}/${birthDay}`)
                    }}
                />
            </div>
            <div className='w-full flex justify-start items-start'>{formik?.errors.birthday && formik?.touched.birthday && <p className='error_Message'>{enToFaNumber(`${formik?.errors.birthday}`)}</p>}</div>
        </div>
    )
}
