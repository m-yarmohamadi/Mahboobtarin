import { useFormik } from 'formik';
import * as Yup from "yup";
import Input from "@/tools/Input"
import TextArea from '@/tools/TextArea';
import Select from '@/tools/Select';
import WorkAddress from './WorkAddress';
import Language from './Language';
import Grade from './Grade';
import Expertise from './Expertise';
import SocialMedia from './SocialMedia';
import Address from './Address';
import useProfile from '@/hooks/useProfile';
import Loading from '@/tools/Loading';
import { Countries } from '@/data/countries';


const gender = [
    { id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 2, label: 'زن', value: 'woman' },
    { id: 3, label: 'مرد', value: 'man' },
];

const taaholStatus = [
    { id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 2, label: 'مجرد', value: 'single' },
    { id: 3, label: 'متاهل', value: 'married' },
];


export default function MyInfo() {
    const { user, expertise, grade, language, isLoading } = useProfile();

    const initialValues = {
        name: user?.name || "",
        lastname: user?.lastname || "",
        national_code: user?.national_code || "",
        mobile: user?.mobile || "",
        gender: user?.gender || "1",
        nationality: user?.nationality || "ایران",
        birthday: user?.birthday || "",
        email: user?.email || "",
        country: user?.country || "",
        province_id: user?.province_id || "",
        city_id: user?.city_id || "",
        address: user?.address || "",
        specialized_system_code: user?.specialized_system_code || "",
        passport_number: user?.passport_number || "",
        picture: '',
    };

    const onSubmit = async (values) => {

    };

    const validationSchema = Yup.object({
        name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
        lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
        gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
        nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
        national_code: Yup.string().when('nationality', {
            is: (value) => value === 'ایرانی',
            then: (schema) => schema.required('وارد کردن کدملی اجباری است').matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
            otherwise: (schema) => schema,
        }),
        passport_number: Yup.string().when('nationality', {
            is: (value) => value === 'اتباع خارجی',
            then: (schema) => schema.required('وارد کردن شماره پاسپورت اجباری است').matches(/^[0-9]{8}$/, 'لطفاً شماره پاسپورت معتبر 8 رقمی وارد کنید'),
            otherwise: (schema) => schema,
        }),

        birthday: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
        mobile: Yup.string()
            .required('وارد کردن شماره تلفن همراه اجباری است')
            .matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
        email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });

    const fields = [
        {
            name: "name",
            label: "نام",
            required: true
        },
        {
            name: "lastname",
            label: "نام خانوادگی",
            required: true
        },
        {
            name: (formik.values.nationality === "ایران" ? "national_code" : "passport_number"),
            label: (formik.values.nationality === "ایران" ? "کد ملی" : "شماره پاسپورت"),
            required: true
        },
        {
            name: "mobile",
            label: "شماره موبایل",
            required: true
        },
        {
            name: "tel",
            label: "تلفن ثابت"
        },
        {
            name: "tel2",
            label: "تلفن اضطراری"
        },
    ];

    if (isLoading) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4"/>
        </div>
    )

    return (
        <div>
            <div>
                <h1 className='text-lg text-gray-800 font-bold'>
                    اطلاعات فردی
                </h1>
                <p className='text-sm text-gray-600'>
                    سعی کنید متنی خلاصه و جذاب درباره خودتان بنویسید
                </p>
            </div>

            <form className='space-y-4'>
                <div className='mt-6 flex flex-col gap-2 lg:gap-10 lg:flex-row'>
                    <div className='flex flex-col items-center gap-4'>
                        <h5 className='text-gray-600 font-bold self-start'>
                            عکس پروفایل
                        </h5>
                        <div className='w-20 h-20 relative flex items-center justify-center rounded-full overflow-hidden bg-primary-03'>
                            <input
                                type="file"
                                id="userProfilePic"
                                accept="image/*"
                                onChange={({ target }) => formik.setFieldValue("picture", target.files[0])}
                                hidden
                            />
                            <img
                                src={formik.values.picture ? URL.createObjectURL(formik.values.picture) : "/images/defaultUser.png"}
                                alt=''
                                className={formik.values.picture && "absolute inset-0 m-auto object-cover w-full h-full"}
                            />
                        </div>
                        <label htmlFor='userProfilePic' className='btn btn--secondary !px-8 cursor-pointer'>
                            تغییر تصویر
                        </label>
                    </div>
                    <div className='flex-1'>
                        <TextArea
                            label="درباره شما"
                            row={6}
                        />
                    </div>
                </div>

                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {fields.map((field) => (
                        <Input
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            formik={formik}
                            required={field?.required}
                        />
                    ))}

                    <Select
                        label="جنسیت"
                        name="gender"
                        formik={formik}
                        options={gender}
                    />

                    <Select
                        label="وضعیت تاهل"
                        name="taahol"
                        formik={formik}
                        options={taaholStatus}
                    />

                    <Input
                        label="تاریخ تولد"
                        name="birthday"
                        formik={formik}
                        type="date"
                    />

                    {/* <DateOfBirth formik={formik} /> */}

                    <Input
                        label="پست الکترونیک"
                        name="email"
                        formik={formik}
                        required={true}
                    />

                    <Select
                        label="ملیت"
                        options={Countries}
                        formik={formik}
                        name="nationality"
                    />

                    <Address formik={formik} />

                    <WorkAddress />

                    <Language languageData={language}/>

                    <Expertise expertiseData={expertise}/>

                    <Grade gradeData={grade}/>



                    {/* <ProfessionalLicense /> */}

                    <SocialMedia />

                    <div className='lg:col-span-2 flex flex-col lg:flex-row gap-4'>
                        <div className='lg:w-[47%]'>
                            <Select
                                label="میزان تجربه"
                                options={[]}
                            />
                        </div>

                        <div className='lg:w-[53%]'>
                            <Input
                                label="کد معرف"
                            />
                        </div>
                    </div>
                    <div className='lg:col-span-2'>
                        <Input
                            label="کد نظام تخصصی"
                        />
                    </div>
                </div>

                <div className='space-y-4'>
                    <TextArea
                        label="کلیه تخصص ها و مهارت ها"
                        row={9}
                    />
                    <TextArea
                        label="آثار و افتخارات"
                        row={9}
                    />
                </div>

                <div className='space-y-4'>
                    <h5 className='text-gray-600 font-bold self-start'>
                        تغییر رمز عبور
                    </h5>
                    <Input
                        label="رمز عبور فعلی"
                        type="password"
                    />
                    <div className='flex flex-col gap-4 lg:flex-row'>
                        <Input
                            label="رمز عبور جدید"
                            type="password"
                        />
                        <Input
                            label="تکرار رمز عبور جدید"
                            type="password"
                        />
                    </div>
                </div>


                <button className='btn btn--success !px-14'>
                    ذخیره تغییرات
                </button>
            </form>
        </div>
    )
}
