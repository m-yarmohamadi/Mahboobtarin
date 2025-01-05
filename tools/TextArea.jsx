export default function TextArea({ name, value, onChange, label, type, required, formik, display = 'block', placeholder, dir = 'rtl', autoComplete = 'off', row = 5 }) {
	return (
		<div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start ${display}`}>
			<label
				className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'
				htmlFor={name}>
				{label}
				{required && <span style={{ color: "red", fontSize: "18px", display: "inline-block", marginRight: "4px" }}>*</span>}
			</label>
			<textarea
				className='w-full appearance-none outline-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md p-4    focus:bg-white focus:shadow-lg focus:dark:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out '
				type={type}
				name={name}
				{...formik?.getFieldProps(name)}
				placeholder={placeholder}
				dir={dir}
				autoComplete={autoComplete}
				rows={row}
				onChange={onChange}
				value={value}
			/>
			<div className='w-full flex justify-start items-start'>{formik?.errors[name] && formik?.touched[name] && <p className='error_Message'>{formik?.errors[name]}</p>}</div>
		</div>
	)
}
