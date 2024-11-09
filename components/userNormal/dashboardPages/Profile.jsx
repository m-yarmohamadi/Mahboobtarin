import ChangePasswordForm from "@/components/admin/adminProfileSteps/myInfo/ChangePasswordForm";
import DateOfBirth from "@/components/admin/adminProfileSteps/myInfo/DateOfBirth";
import Modal from "@/components/Modal";
import { Countries } from "@/data/countries";
import useForgetPassword from "@/hooks/useForgetPassword";
import useProfile from "@/hooks/useProfile";
import { updateProfile } from "@/services/authService";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import Select from "@/tools/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import PictureEditor from "@/components/PictureEditor";


const gender = [
    { id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 2, label: 'زن', value: 'woman' },
    { id: 3, label: 'مرد', value: 'man' },
];

export default function Profile() {
    const { user, isLoading } = useProfile();
    const [passwordModal, setPasswordModal] = useState(false);
    const getNationality = Countries.filter((c) => c.value === user?.nationality)[0]?.label;
    const [profileImg, setProfileImg] = useState(null);

    const initialValues = {
        name: user?.name || "",
        lastname: user?.lastname || "",
        national_code: user?.national_code || "",
        mobile: user?.mobile || "",
        gender: user?.gender || "1",
        nationality: getNationality || "Iran",
        birthday: user?.birthday || "",
        email: user?.email || "",
        unique_url_id: user?.unique_url_id || "",
        picture: "",
    };

    const { mutate: mutateUpdateProfile, isPending: isUpdating } = useMutation({ mutationFn: updateProfile });
    const queryClient = useQueryClient();

    const onSubmit = (values) => {
        const profileData = {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            gender: values.gender,
            nationality: values.nationality,
            birthday: values.birthday,
            unique_url_id: values.unique_url_id,
            avatar: values.picture,
        }

        const data = new FormData();

        for (const key in profileData) {
            if (Array.isArray(profileData[key]) && profileData[key].length > 0) {
                data.append(key, JSON.stringify(profileData[key]));
            } else {
                data.append(key, profileData[key]);
            }
        }
        mutateUpdateProfile(data, {
            onSuccess: ({ data }) => {
                if (data.status === 200) {
                    toast.success("پروفایل شما با موفقیت ویرایش شد");
                    queryClient.invalidateQueries({ queryKey: ["get-profile"] });
                }
            },
            onError: (error) => {
                toast.error("خطا در ویرایش پروفایل!");
            }
        })
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
            disabled: true
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
                                    formik.values.picture ?
                                        URL.createObjectURL(formik.values.picture)
                                        :
                                        user?.avatar.length ?
                                            user?.avatar[0].path
                                            :
                                            "/images/defaultUser.png"
                                }
                                alt=''
                                className={formik.values.picture || user?.avatar.length && "object-cover w-full h-full"}
                            />
                        </div>
                        <label htmlFor='userProfilePic' className='btn btn--secondary !px-8 cursor-pointer'>
                            ویرایش عکس
                        </label>
                        <PictureEditor
                            open={profileImg ? true : false}
                            onClose={() => setProfileImg(null)}
                            image={profileImg}
                            onCrop={(e) => formik.setFieldValue("picture", e)}
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

                    <DateOfBirth formik={formik} birthday={user?.birthday} />

                    <Input
                        label="پست الکترونیک"
                        name="email"
                        type="email"
                        formik={formik}
                    />

                    <Input
                        label="ملیت"
                        formik={formik}
                        name="nationality"
                        disabled={true}
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
