import Select from "@/tools/Select";
import { useEffect, useState } from "react";


const daysArray = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString();
    return { id: day, label: day, value: day };
});

const monthArray = [
    { id: '1', label: 'January', value: '01' },
    { id: '2', label: 'February', value: '02' },
    { id: '3', label: 'March', value: '03' },
    { id: '4', label: 'April', value: '04' },
    { id: '5', label: 'May', value: '05' },
    { id: '6', label: 'June', value: '06' },
    { id: '7', label: 'July', value: '07' },
    { id: '8', label: 'August', value: '08' },
    { id: '9', label: 'September', value: '09' },
    { id: '10', label: 'October', value: '10' },
    { id: '11', label: 'November', value: '11' },
    { id: '12', label: 'December', value: '12' }
];

const currentYearMiladi = new Date().getFullYear();
const startYearMiladi = 1921;
const yearsArray = Array.from({ length: currentYearMiladi - startYearMiladi + 1 }, (_, i) => {
    const year = (startYearMiladi + i).toString();
    return { id: year, label: year, value: year };
});

export default function DateOfBirth({ formik, birthday }) {
    const [birthDay, setBirthDay] = useState(birthday.split("-")[2]);
    const [birthMonth, setBirthMonth] = useState(birthday.split("-")[1]);
    const [birthYear, setBirthYear] = useState(birthday.split("-")[0]);

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
                        formik.setFieldValue("birthday", `${birthYear}-${birthMonth}-${e.target.value}`);
                    }}
                />
                <Select
                    name="birthMonth"
                    options={monthArray}
                    value={birthMonth}
                    onChange={(e) => {
                        setBirthMonth(e.target.value);
                        formik.setFieldValue("birthday", `${birthYear}-${e.target.value}-${birthDay}`);
                    }}
                />
                <Select
                    name="birthYear"
                    options={yearsArray}
                    value={birthYear}
                    onChange={(e) => {
                        setBirthYear(e.target.value);
                        formik.setFieldValue("birthday", `${e.target.value}-${birthMonth}-${birthDay}`)
                    }}
                />
            </div>
            <div className='w-full flex justify-start items-start'>{formik?.errors.birthday && formik?.touched.birthday && <p className='error_Message'>{enToFaNumber(`${formik?.errors.birthday}`)}</p>}</div>
        </div>
    )
}
