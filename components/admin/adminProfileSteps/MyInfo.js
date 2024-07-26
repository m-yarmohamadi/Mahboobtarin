import React from 'react';

const MyInfo = () => {
    const initialValues = {
		name: '',
		lastname: '',
		national_code: '',
		passport_number: '',
tel:"",
tel2:"",

		gender: '',
        taahol:"",
        		birthday: '',
		email: '',

		nationality: '',
        country:'',
        ostan:'',
        
	};
    const onSubmit = async (values) => {
		setError2([]);
		setLoading(1)
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				step: '1',
				type:'expert'
			});
			console.log(response.data);
			setNationalCode(values.national_code);
			setLoading(0)
			nextStep();
		} catch (error) {
			console.log(error);
			setLoading(0)
			setError2(error.response.data.message);

			toastFunction(error2, 'error');
		}
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


    return (
        <div>
<form>
    
</form>

        </div>
    );
};

export default MyInfo;