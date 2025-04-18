import { enToFaNumber } from "@/utils/enToFa";
import React from "react";

const Textaria = ({
  value,
  disabled,
  onChange,
  required = "true",
  name,
  label,
  type,
  formik,
  display = "block",
  placeholder,
  dir = "rtl",
  autoComplete = "off",
  rows,
  cols,
}) => {
  return (
    <div
      className={`w-full py-1 flex flex-col justify-start justify-items-start items-start ${display}`}
    >
      <label className="text-sm font-bold px-2" htmlFor={name}>
        {label}
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
      <textarea
        rows={rows}
        cols={cols}
        className="w-full bg-slate-200 text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg dark:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out "
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        {...formik?.getFieldProps(name)}
        placeholder={placeholder}
        dir={dir}
        disabled={disabled}
        autoComplete={autoComplete}
      ></textarea>
      <div className="w-full flex justify-start items-start">
        {formik?.errors[name] && formik?.touched[name] && (
          <p className="error_Message">
            {enToFaNumber(`${formik?.errors[name]}`)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textaria;
