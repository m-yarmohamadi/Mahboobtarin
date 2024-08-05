
const InputFileform = ({ formik,label, name, type,required, onChange, value }) => {


    return (
        <div className="">
			<label
				className='text-sm font-bold px-2 mb-2 inline-block text-gray-800'
				htmlFor={name}>
				{label}
				{required && <span style={{color:"red", fontSize:"18px", display:"inline-block", marginRight:"4px"}}>*</span>}
			</label>
            <input
				className='w-full bg-transparent text-sm text-gray-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg focus:shadow-red-300 transition-all duration-300 ease-in-out '
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
				{...formik?.getFieldProps(name)}

            />
            {formik?.touched[name] && formik?.errors[name] ? (
                <div className="error_Message ">{t(formik?.errors[name])}</div>
            ) : null}
        </div>
    );
};

export default InputFileform;
