import ReactSelect from 'react-select';

export default function MultiSelect({ name, label, options, placeholder, required, formik, onChange, value, disabled, noError = false }) {
    return (
        <div className='w-full py-1 flex flex-col justify-start justify-items-start items-start'>
            <label
                className='text-sm font-bold px-2 inline-block mb-2 text-slate-800'
                htmlFor={name}>
                {label}
                {required && <span style={{ color: "red", fontSize: "18px", display: "inline-block", marginRight: "4px" }}>*</span>}
            </label>
            <div className='w-full '>
                <ReactSelect
                    defaultValue={value}
                    onChange={onChange}
                    name={name}
                    id={name}
                    isMulti
                    placeholder={placeholder}
                    options={options || []}
                    className="react-select-container"
                    classNamePrefix="react-select"
                />
                {formik?.errors[name] && formik?.touched[name] && !noError &&
                    <div className='w-full flex justify-start items-start mt-2'>
                        <p className='error_Message'>
                            {formik?.errors[name]}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}
