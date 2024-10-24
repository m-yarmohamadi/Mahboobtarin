import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "@/tools/Select";
import Input from "@/tools/Input";
import { useGetExpertisesList } from "@/hooks/useExpertiseUser";
import useMainPage from "@/hooks/useMainPage";

const ExpertiseModal = ({
  openExpertiseModal,
  setOpenExpertiseModal,
  formikExpertise,
  transformCategories,
  isGetCategories,
}) => {
  const initialValues = {
    title: "",
    subject: "",
  };

  const onSubmit = (values, { resetForm }) => {
    formikExpertise.setFieldValue("expertise", [
      ...formikExpertise.values.expertise,
      values,
    ]);
    setOpenExpertiseModal(false);
    resetForm();
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("وارد کردن موضوع تخصص اجباری است"),
    subject: Yup.string()
      .required("وارد کردن عنوان تخصص اجباری است")
      .min(3, "حداقل 3 حرف وارد کنید")
      .max(30, "حداکثر 30 حرف وارد کنید"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <Dialog
      open={openExpertiseModal}
      onClose={setOpenExpertiseModal}
      className="relative z-10 mt-44"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form
              onSubmit={formik.handleSubmit}
              className="w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
            >
              <Select
                name={"title"}
                label={"موضوع تخصص"}
                options={
                  !isGetCategories
                    ? [
                        {
                          id: -1,
                          value: "",
                          label: "موضوع تخصص را انتخاب کنید",
                        },
                        ...transformCategories,
                      ]
                    : [
                        {
                          id: -1,
                          value: "",
                          label: "موضوع تخصص را انتخاب کنید",
                        },
                      ]
                }
                formik={formik}
              />
              <Input
                name={"subject"}
                label={"عنوان تخصص"}
                type={"text"}
                formik={formik}
              />
              <div className="bg-slate-50 dark:bg-slate-100 ps-4 py-3 sm:flex sm:flex-row-reverse ">
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-01 px-3 py-2 text-sm font-semibold text-[#fff] shadow-sm dark:shadow-darkSm ring-1 ring-inset ring-gray-300 hover:bg-opacity-85 sm:mt-0 sm:w-auto"
                >
                  ثبت
                </button>
                <button
                  onClick={() => setOpenExpertiseModal(false)}
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-[#fff] shadow-sm dark:shadow-darkSm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  انصراف
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ExpertiseModal;
