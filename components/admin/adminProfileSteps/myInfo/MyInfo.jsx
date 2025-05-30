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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/services/authService';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import ChangePasswordForm from './ChangePasswordForm';
import useForgetPassword from '@/hooks/useForgetPassword';
import { ThreeDots } from 'react-loader-spinner';
import DateOfBirth from './DateOfBirth';
import { Countries } from "@/data/countries";
import PictureEditor from '@/components/PictureEditor';
import CheckBoxInput from '@/components/CheckBoxInput';

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
    const [passwordModal, setPasswordModal] = useState(false);
    const [profileImg, setProfileImg] = useState(null);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const getNationality = Countries.filter((c) => c.value === user?.nationality)[0]?.label;

    const initialValues = {
        name: user?.name || "",
        lastname: user?.lastname || "",
        national_code: user?.national_code || "",
        mobile: user?.mobile || "",
        phone: user?.phone || "",
        emergency_phone: user?.emergency_phone || "",
        marital_status: user?.marital_status || "1",
        gender: user?.gender || "1",
        nationality: getNationality || "Iran",
        birthday: user?.birthday || "",
        email: user?.email || "",
        country: user?.country || "",
        province_id: user?.province_id || "",
        city_id: user?.city_id || "",
        address: user?.address || "",
        specialized_system_code: user?.specialized_system_code || "",
        passport_number: user?.passport_number || "",
        picture: user?.avatar.length ? user?.avatar[0].path : "/images/user.png",
        expert_description: user?.expert_description || "",
        expertise: expertise || [],
        workAddress: address || [],
        language: language || [],
        grade: grade || [],
        socialmedia: user?.socialmedia ? JSON.parse(user?.socialmedia) : [],
        honors_description: user?.honors_description || "",
        description: user?.description || "",
        amount_experience_year: user?.amount_experience_year || "",
        unique_url_id: user?.unique_url_id || "",
        user_title: user?.user_title || "",
        identificationcode: user?.identificationcode,
        permissions: user?.permissions ? JSON.parse(user?.permissions) : { phone: false, workAddress: false }
    };
    const { mutate: mutateUpdateProfile, isPending: isUpdating } = useMutation({ mutationFn: updateProfile });
    const queryClient = useQueryClient();

    const onSubmit = (values) => {
        const profileData = {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            unique_url_id: values.unique_url_id,
            user_title: values.user_title,
            gender: values.gender,
            phone: values.phone,
            nationality: values.nationality,
            emergency_phone: values.emergency_phone,
            marital_status: values.marital_status,
            birthday: values.birthday,
            expert_description: values.expert_description,
            expertise: values.expertise,
            language: values.language,
            grade: values.grade,
            address: values.workAddress,
            honors_description: values.honors_description,
            description: values.description,
            avatar: values.picture,
            amount_experience_year: values.amount_experience_year,
            socialmedia: values.socialmedia,
            specialized_system_code: values.specialized_system_code,
            identificationcode: values.identificationcode,
            country: values.country,
            province_id: values.province_id,
            city_id: values.city_id,
            user_address: values.address
        }

        const data = new FormData();

        for (const key in profileData) {
            if (Array.isArray(profileData[key]) && profileData[key].length > 0) {
                data.append(key, JSON.stringify(profileData[key]));
            } else {
                data.append(key, profileData[key]);
            }
        }

        const valuesPermissions = {
            phone: values.phone ? values.permissions.phone : false,
            workAddress: values.workAddress.length ? values.permissions.workAddress : false,
        }
        data.append("permissions", JSON.stringify(valuesPermissions));

        mutateUpdateProfile(data, {
            onSuccess: ({ data }) => {
                if (data.status === 200) {
                    toast.success("پروفایل شما با موفقیت ویرایش شد");
                    queryClient.invalidateQueries({ queryKey: ["get-profile"] });
                }
            },
            onError: (error) => {
                if (error?.response?.status === 401) {
                    toast.error("وارد حساب کاربری خود شوید")
                    window.location.reload();
                    return;
                }
                toast.error("خطا در ویرایش پروفایل!")
            }
        })
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
        lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
        unique_url_id: Yup.string().required('وارد کردن نام کاربری اجباری است').matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد'),
        email: Yup.string().email("ایمیل نامعتبر است"),
        gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
        nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
        national_code: Yup.string().when('nationality', {
            is: (value) => value === 'Iran',
            then: (schema) => schema.required('وارد کردن کدملی اجباری است').matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
            otherwise: (schema) => schema,
        }),
        // passport_number: Yup.string().when('nationality', {
        //     is: (value) => value !== 'ایران',
        //     then: (schema) => schema.required('وارد کردن شماره پاسپورت اجباری است').matches(/^[0-9]{8}$/, 'لطفاً شماره پاسپورت معتبر 8 رقمی وارد کنید'),
        //     otherwise: (schema) => schema,
        // }),

        birthday: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
        mobile: Yup.string()
            .required('وارد کردن شماره تلفن همراه اجباری است')
            .matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
        phone: Yup.string()
            .matches(/^0[0-9]{2,3}-?[0-9]{7,8}$/, "لطفا شماره تلفن معتبر وارد کنید"),
        emergency_phone: Yup.string()
            .matches(/^0[0-9]{2,3}-?[0-9]{7,8}$/, "لطفا شماره تلفن معتبر وارد کنید"),
        picture: Yup.string().required("تصویر پروفایل را انتخاب کنید")
            .test("not-default", "تصویر پروفایل را انتخاب کنید", value => value !== "/images/user.png"),
    });

    const { forgetPasswordMutate, isForgetPassLoadingt } = useForgetPassword();

    const forgetPasswordHandler = () => {
        forgetPasswordMutate({ username: user?.mobile }, {
            onSuccess: () => {
                setPasswordModal(true);
            }
        })
    }

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
            required: true,
        },
        {
            name: "lastname",
            label: "نام خانوادگی",
            required: true
        },
        {
            name: "unique_url_id",
            label: "نام کاربری",
        },
        {
            name: "user_title",
            label: "عنوان نمایشی",
        },
        {
            name: (getNationality === "ایران" ? "national_code" : "passport_number"),
            label: (getNationality === "ایران" ? "کد ملی" : "شماره پاسپورت"),
            disabled: true
        },
        {
            name: "mobile",
            label: "شماره موبایل",
            disabled: true
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
                <h1 className='text-lg text-slate-800 font-bold'>
                    اطلاعات فردی
                </h1>
            </div>

            <form className='space-y-4' onSubmit={formik.handleSubmit}>
                <div className='mt-6 flex flex-col gap-2 lg:gap-10 lg:flex-row'>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='w-20 h-20 relative flex items-center justify-center rounded-full overflow-hidden bg-primary-03'>
                            <input
                                type="file"
                                id="userProfilePic"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const maxFileSize = 2 * 1024 * 1024; // 2MB

                                    if (file && file.size > maxFileSize) {
                                        toast.error("حجم تصویر باید حداکثر 2 مگابایت باشد")
                                        e.target.value = null;
                                    } else {
                                        setProfileImg(file);
                                    }
                                }}
                                hidden
                            />
                            <img
                                src={
                                    changeAvatar ?
                                        URL.createObjectURL(formik.values.picture)
                                        :
                                        formik.values.picture
                                }
                                alt=''
                                className={"object-cover w-full h-full"}
                            />
                        </div>
                        <label htmlFor='userProfilePic' className='btn btn--secondary !px-8 cursor-pointer'>
                            ویرایش عکس
                        </label>
                        {formik?.errors.picture && formik?.touched.picture && (
                            <p className="error_Message">{formik?.errors.picture}</p>
                        )}
                        <PictureEditor
                            open={profileImg ? true : false}
                            onClose={() => setProfileImg(null)}
                            image={profileImg}
                            onCrop={(e) => {
                                formik.setFieldValue("picture", e);
                                setChangeAvatar(true);
                            }}
                        />
                    </div>
                    <div className='flex-1'>
                        <TextArea
                            label="لطفا خود را در قالب متنی خلاصه و جذاب معرفی کنید!"
                            row={6}
                            name="description"
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

                    <div className='w-full flex flex-col gap-2'>
                        <Input
                            label={"تلفن ثابت"}
                            name={"phone"}
                            formik={formik}
                        />
                        {formik.values.phone &&
                            <CheckBoxInput
                                label={"نمایش تلفن ثابت برای همه"}
                                name={'show_phone'}
                                checked={formik.values.permissions.phone}
                                onChecked={(e) => formik.setFieldValue("permissions", { ...formik.values.permissions, phone: e.target.checked })}
                            />
                        }
                    </div>

                    <Input
                        label={"تلفن اضطراری"}
                        name={"emergency_phone"}
                        formik={formik}
                    />

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

                    {/* <Input
                        label="تاریخ تولد"
                        name="birthday"
                        formik={formik}
                        type="date"
                        required={true}
                    /> */}

                    <DateOfBirth formik={formik} birthday={user?.birthday} />

                    <Input
                        label="پست الکترونیک"
                        name="email"
                        type="email"
                        formik={formik}
                    />


                    <Address formik={formik} isLoading={isLoading} />

                    <div className='lg:col-span-2 flex flex-col gap-2'>
                        <WorkAddress formik={formik} />
                        {formik.values.workAddress.length ?
                            <CheckBoxInput
                                label={"نمایش آدرس و لوکیشن برای همه"}
                                name={'show_workAddress'}
                                checked={formik.values.permissions.workAddress}
                                onChecked={(e) => formik.setFieldValue("permissions", { ...formik.values.permissions, workAddress: e.target.checked })}
                            /> : null
                        }
                    </div>

                    <Language formik={formik} />

                    <Expertise formik={formik} />

                    <Grade formik={formik} />

                    {/* <ProfessionalLicense /> */}

                    <SocialMedia formik={formik} />

                    <div className='lg:col-span-2 flex flex-col lg:flex-row gap-4'>
                        <div className='lg:w-[47%]'>
                            <Input
                                label="(به سال) میزان تجربه"
                                placeholder={'مثال 5'}
                                type={'number'}
                                formik={formik}
                                name={'amount_experience_year'}
                            />
                        </div>

                        <div className='lg:w-[53%]'>
                            <Input
                                label="کد معرف"
                                name={'identificationcode'}
                                formik={formik}
                            />
                        </div>
                    </div>
                    <div className='lg:col-span-2'>
                        <Input
                            label="کد نظام تخصصی"
                            name={'specialized_system_code'}
                            formik={formik}
                        />
                    </div>
                </div>

                <div className='space-y-4'>
                    <TextArea
                        label="کلیه تخصص ها و مهارت ها"
                        row={9}
                        formik={formik}
                        name="expert_description"
                    />
                    <TextArea
                        label="آثار و افتخارات"
                        row={9}
                        formik={formik}
                        name="honors_description"
                    />
                </div>

                <Modal title="تغییر رمز عبور" open={passwordModal} onClose={() => setPasswordModal(false)}>
                    <ChangePasswordForm onClose={() => setPasswordModal(false)} username={user?.username} />
                </Modal>

                <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                    {
                        isUpdating ?
                            <div className='w-full sm:w-auto sm:max-w-max btn btn--success !px-14'>
                                <Loading />
                            </div>
                            :
                            <button type='submit' className='w-full sm:w-auto btn btn--success !px-14'>
                                ذخیره تغییرات
                            </button>
                    }
                    {
                        isForgetPassLoadingt ?
                            <div className='w-full sm:w-auto btn btn--outline !px-14'>
                                <ThreeDots
                                    visible={true}
                                    height='20'
                                    width='45'
                                    color="#15aa7f"
                                    radius='9'
                                    ariaLabel='three-dots-loading'
                                />
                            </div>
                            :
                            <button onClick={forgetPasswordHandler} type='button' className='w-full sm:w-auto btn btn--outline'>
                                تغییر رمز عبور
                            </button>
                    }
                </div>
            </form>
        </div>
    )
}
