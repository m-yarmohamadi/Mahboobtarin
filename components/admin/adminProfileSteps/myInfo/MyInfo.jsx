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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/services/authService';
import toast from 'react-hot-toast';


const gender = [
    { id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 2, label: 'زن', value: 'woman' },
    { id: 3, label: 'مرد', value: 'man' },
];

const taaholStatus = [
    { id: 1, label: 'مجرد', value: 'single' },
    { id: 2, label: 'متاهل', value: 'married' },
];


export default function MyInfo() {
    const { user, expertise, grade, language, isLoading, address } = useProfile();

    const initialValues = {
        name: user?.name || "",
        lastname: user?.lastname || "",
        national_code: user?.national_code || "",
        mobile: user?.mobile || "",
        phone: user?.phone || "",
        emergency_phone: user?.emergency_phone || "",
        marital_status: user?.marital_status || "1",
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
        expert_description: user?.expert_description || "",
        expertise: expertise || [],
        workAddress: address || [],
        language: language || [],
        grade: grade || [],
        honors_description: user?.honors_description || ""
    };

    const { mutateAsync: mutateUpdateProfile, isPending: isUpdating } = useMutation({ mutationFn: updateProfile });
    const queryClient = useQueryClient();

    const onSubmit = async (values) => {
        const { name,
            lastname,
            email,
            gender,
            phone,
            emergency_phone,
            marital_status,
            birthday,
            nationality,
            expert_description,
            expertise,
            language,
            grade,
            workAddress,
            honors_description,
        } = values;

        try {
            const { data } = await mutateUpdateProfile({
                name, lastname, email, gender, phone, emergency_phone, marital_status, birthday, nationality, expert_description,
                honors_description,
                language, grade, address: workAddress, expertise
            });
            if (data.status === 200) {
                toast.success("پروفایل شما با موفقیت ویرایش شد");
                queryClient.invalidateQueries({queryKey:["get-profile"]});
            }
        } catch (error) {
            if(error) toast.error("خطایی رخ داده")
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
        lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
        email: Yup.string().email("ایمیل نامعتبر است"),
        gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
        nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
        national_code: Yup.string().when('nationality', {
            is: (value) => value === 'ایران',
            then: (schema) => schema.required('وارد کردن کدملی اجباری است').matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
            otherwise: (schema) => schema,
        }),
        passport_number: Yup.string().when('nationality', {
            is: (value) => value !== 'ایران',
            then: (schema) => schema.required('وارد کردن شماره پاسپورت اجباری است').matches(/^[0-9]{8}$/, 'لطفاً شماره پاسپورت معتبر 8 رقمی وارد کنید'),
            otherwise: (schema) => schema,
        }),

        birthday: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
        mobile: Yup.string()
            .required('وارد کردن شماره تلفن همراه اجباری است')
            .matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
        phone: Yup.string()
            .matches(/^0[0-9]{2,3}-?[0-9]{7,8}$/, "لطفا شماره تلفن معتبر وارد کنید")
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
            disabled: true,
        },
        {
            name: "lastname",
            label: "نام خانوادگی",
            disabled: true
        },
        {
            name: (formik.values.nationality === "ایران" ? "national_code" : "passport_number"),
            label: (formik.values.nationality === "ایران" ? "کد ملی" : "شماره پاسپورت"),
            disabled: true
        },
        {
            name: "mobile",
            label: "شماره موبایل",
            disabled: true
        },
        {
            name: "phone",
            label: "تلفن ثابت"
        },
        {
            name: "emergency_phone",
            label: "تلفن اضطراری"
        },
    ];

    if (isLoading) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
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

            <form className='space-y-4' onSubmit={formik.handleSubmit}>
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
                            name="expert_description"
                            formik={formik}
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
                            disabled={field?.disabled}
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
                        name="marital_status"
                        formik={formik}
                        options={taaholStatus}
                    />

                    <Input
                        label="تاریخ تولد"
                        name="birthday"
                        formik={formik}
                        type="date"
                        required={true}
                    />

                    {/* <DateOfBirth formik={formik} /> */}

                    <Input
                        label="پست الکترونیک"
                        name="email"
                        formik={formik}
                    />

                    <Select
                        label="ملیت"
                        options={Countries}
                        formik={formik}
                        name="nationality"
                    />

                    <Address formik={formik} />

                    <WorkAddress formik={formik} />

                    <Language formik={formik} />

                    <Expertise formik={formik} />

                    <Grade formik={formik} />



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
                        formik={formik}
                        name="honors_description"
                    />
                </div>

                {/* <div className='space-y-4'>
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
                </div> */}


                {
                    isUpdating ?
                        <div className='max-w-max btn btn--success !px-14'>
                            <Loading />
                        </div>
                        :
                        <button type='submit' className='btn btn--success !px-14'>
                            ذخیره تغییرات
                        </button>
                }
            </form>
        </div>
    )
}
