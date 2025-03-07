import { enToFaNumber } from "@/utils/enToFa";
import React from "react";

const Input = ({
  value,
  disabled,
  onChange,
  required,
  name,
  label,
  smallDesc,
  type,
  formik,
  display = "block",
  placeholder,
  dir = "rtl",
  autoComplete = "off",
}) => {
  return (
    <div
      className={`w-full ${
        disabled && "opacity-50"
      } py-1 flex flex-col justify-start justify-items-start items-start ${display}`}
    >
      <label
        className="text-sm font-bold px-2 mb-2 text-slate-800 flex items-center gap-1"
        htmlFor={name}
      >
        {label}
        {smallDesc && <span className="text-[10px] font-normal">({smallDesc})</span>}
        {required && (
          <span
            style={{
              color: "red",
              fontSize: "18px",
              display: "inline-block",
              marginRight: "4px",
            }}
          >
            *
          </span>
        )}
      </label>
      <input
        className="w-full appearance-none outline-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg focus:dark:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out "
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        {...formik?.getFieldProps(name)}
        placeholder={placeholder}
        dir={dir}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      <div className="w-full flex justify-start items-start mt-2">
        {formik?.errors[name] && formik?.touched[name] && (
          <p className="error_Message">
            {enToFaNumber(`${formik?.errors[name]}`)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
