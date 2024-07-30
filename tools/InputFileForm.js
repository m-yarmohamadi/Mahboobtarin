
const InputFileform = ({ formik,label, name, type,required }) => {


    return (
        <div className=" h-20">
			<label
				className='text-sm font-bold px-2'
				htmlFor={name}>
				{label}
				{required && <span style={{color:"red", fontSize:"18px", display:"inline-block", marginRight:"4px"}}>*</span>}
			</label>
            <input
				className='w-full bg-gray-200 text-gray-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg focus:shadow-red-300 transition-all duration-300 ease-in-out '
                type={type}
                name={name}
                required
				// {...formik?.getFieldProps(name)}

            />
            {formik.touched[name] && formik.errors[name] ? (
                <div className="error_Message ">{t(formik.errors[name])}</div>
            ) : null}
        </div>
    );
};

export default InputFileform;
