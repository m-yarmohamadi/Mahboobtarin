import useAllSettings from "@/hooks/useAllSettings";
import { enToFaNumber } from "@/utils/enToFa";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const CheckBox = ({ name, formik }) => {
  const [openRules, setOpenRules] = useState(false);

  return (
    <div>
      <div className="flex items-start my-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          value={true}
          {...formik.getFieldProps(name)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-slate-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-slate-600"
        />
        <label className="ms-2 text-sm font-medium text-slate-900 ">
          {/* قوانین وب سایت را خواندم و محتوای آن را می پذیرم. */}
          اینجانب{" "}
          <span
            onClick={() => setOpenRules(true)}
            className="text-primary-01 cursor-pointer"
          >
            قوانین و مقررات محبوب ترین{" "}
          </span>{" "}
          را خواندم و محتوای آن را میپذریم.
        </label>
      </div>
      <div className="w-full flex justify-start items-start">
        {formik.errors[name] && formik.touched[name] && (
          <p className="error_Message">
            {enToFaNumber(`${formik.errors[name]}`)}
          </p>
        )}
      </div>

      <RulesPopup open={openRules} onClose={() => setOpenRules(false)} />
    </div>
  );
};

export default CheckBox;

function RulesPopup({ onClose, open }) {
  const data = useAllSettings();

  if (open) {
    return (
      <>
        <div
          onClick={onClose}
          className="w-full h-full fixed top-0 right-0 bg-slate-900 opacity-60 z-50"
        ></div>

        <div className="w-full flex flex-col gap-6 md:w-[90%] h-[80%] overflow-y-auto bg-white shadow-lg dark:shadow-darkLg px-6 pb-6 fixed top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-50">
          <div className="w-full sticky top-0 right-0 bg-white flex items-center justify-between py-4 border-b border-b-slate-400">
            <div className="font-bold text-slate-800">
              قوانین و مقررات محبوب ترین
            </div>
            <button onClick={onClose}>
              <MdClose className="w-6 h-6 text-slate-800" />
            </button>
          </div>
          <div
            className="w-full  flex  flex-col justify-center items-start gap-4 text-justify text-primary-01 "
            dangerouslySetInnerHTML={{ __html: data?.rules }}
          ></div>
        </div>
      </>
    );
  }
}
