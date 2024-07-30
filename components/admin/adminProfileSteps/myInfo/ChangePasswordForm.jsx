import useChangePassword from '@/hooks/useChangePassword';
import Input from '@/tools/Input'
import Loading from '@/tools/Loading';
import { useFormik } from 'formik'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import * as Yup from "yup"


const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
    otp: ""
};

const validationSchema = Yup.object({
    newPassword: Yup.string()
        .required("رمز عبور جدید اجباری است")
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .matches(/^(?=.*\d).{1,}$/, "رمز عبور باید شامل حداقل یک عدد باشد")
        .matches(/^(?=.*[a-zA-Z]).{1,}$/, "رمز عبور باید شامل حداقل یک حرف انگلیسی باشد")
        .matches(/^(?=.*[!@#$%^&*]).{1,}$/, "رمز عبور باید شامل حداقل یک (!@#$%^&*) باشد"),
    confirmNewPassword: Yup.string()
        .required("تکرار رمز عبور جدید اجباری است")
        .oneOf([Yup.ref('newPassword'), null], 'رمز عبور و تکرار آن باید یکسان باشند'),
    otp: Yup.string()
        .required("کد تایید را وارد کنید")
        .min(5, "کد تایید را به صورت کامل وارد کنید"),
})

export default function ChangePasswordForm({ onClose, username }) {
    const { changePasswordMutate, isChangingPass } = useChangePassword();

    const onSubmit = (values, { resetForm }) => {
        changePasswordMutate({ password: values.newPassword, otp: values.otp, username }, {
            onSuccess: () => {
                onClose();
                resetForm();
            },
            onError: (error) => {
                if (error?.response?.data?.message === "Input data is wrong") {
                    formik.setFieldError("otp", "کد تایید وارد شده نادرست است");
                } else {
                    toast.error("رمز عبور تغییر نکرد!");
                }
            }
        })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='space-y-4'>
                <Input
                    label="کد تایید"
                    name="otp"
                    type="number"
                    formik={formik}
                />
                <div className='flex flex-col gap-4 lg:flex-row'>
                    <Input
                        label="رمز عبور جدید"
                        name="newPassword"
                        type="password"
                        formik={formik}
                    />
                    <Input
                        label="تکرار رمز عبور جدید"
                        name="confirmNewPassword"
                        type="password"
                        formik={formik}
                    />
                </div>
            </div>

            <div className='w-1/2 flex items-center gap-4 mt-7'>
                {
                    isChangingPass ?
                        <div className='w-full sm:w-auto max-w-max btn btn--primary !px-9'>
                            <ThreeDots
                                visible={true}
                                height='20'
                                width='45'
                                color="#fff"
                                radius='9'
                                ariaLabel='three-dots-loading'
                            />
                        </div>
                        :
                        <button type='submit' className='btn btn--primary w-full'>
                            تایید
                        </button>
                }
                <button type='button' onClick={onClose} className='btn btn--outline w-full'>
                    لغو
                </button>
            </div>
        </form>
    )
}
